import plotly.graph_objects as go
import numpy as np

# Data from the provided JSON
stock_prices = [80, 82, 84, 86, 88, 90, 92, 93.5, 95, 97, 99, 100, 101, 103, 105, 106.5, 108, 110, 112, 114, 116, 118, 120]
payoffs = [-13.5, -11.5, -9.5, -7.5, -5.5, -3.5, -1.5, 0, -1.5, -3.5, -5.5, -6.5, -5.5, -3.5, -1.5, 0, 1.5, 3.5, 5.5, 7.5, 9.5, 11.5, 13.5]
strike_price = 100
upper_breakeven = 106.5
lower_breakeven = 93.5
max_loss = -6.5

# Create the figure
fig = go.Figure()

# Add profit areas (green zones)
# Lower profit area (below lower breakeven)
profit_stocks_lower = [s for s, p in zip(stock_prices, payoffs) if s <= lower_breakeven and p >= 0]
profit_payoffs_lower = [p for s, p in zip(stock_prices, payoffs) if s <= lower_breakeven and p >= 0]

# Upper profit area (above upper breakeven)  
profit_stocks_upper = [s for s, p in zip(stock_prices, payoffs) if s >= upper_breakeven and p >= 0]
profit_payoffs_upper = [p for s, p in zip(stock_prices, payoffs) if s >= upper_breakeven and p >= 0]

# Add profit zones using brand colors
if profit_stocks_lower and profit_payoffs_lower:
    fig.add_trace(go.Scatter(
        x=profit_stocks_lower + profit_stocks_lower[::-1],
        y=profit_payoffs_lower + [0] * len(profit_payoffs_lower),
        fill='toself',
        fillcolor='rgba(236, 235, 213, 0.5)',  # Light green from brand colors
        line=dict(color='rgba(0,0,0,0)'),
        name='Profit',
        showlegend=True
    ))

if profit_stocks_upper and profit_payoffs_upper:
    fig.add_trace(go.Scatter(
        x=profit_stocks_upper + profit_stocks_upper[::-1],
        y=profit_payoffs_upper + [0] * len(profit_payoffs_upper),
        fill='toself',
        fillcolor='rgba(236, 235, 213, 0.5)',  # Light green from brand colors
        line=dict(color='rgba(0,0,0,0)'),
        name='Profit',
        showlegend=False
    ))

# Add loss area (red zone)
loss_stocks = [s for s, p in zip(stock_prices, payoffs) if p < 0]
loss_payoffs = [p for s, p in zip(stock_prices, payoffs) if p < 0]

if loss_stocks and loss_payoffs:
    fig.add_trace(go.Scatter(
        x=loss_stocks + loss_stocks[::-1],
        y=loss_payoffs + [0] * len(loss_payoffs),
        fill='toself',
        fillcolor='rgba(180, 65, 60, 0.3)',  # Red from brand colors
        line=dict(color='rgba(0,0,0,0)'),
        name='Loss',
        showlegend=True
    ))

# Add the main payoff line using brand color
fig.add_trace(go.Scatter(
    x=stock_prices,
    y=payoffs,
    mode='lines',
    line=dict(color='#1FB8CD', width=3),  # Strong cyan from brand colors
    name='Straddle P&L',
    cliponaxis=False
))

# Add key points as markers
fig.add_trace(go.Scatter(
    x=[lower_breakeven, strike_price, upper_breakeven],
    y=[0, max_loss, 0],
    mode='markers',
    marker=dict(color='#5D878F', size=8, symbol='circle'),
    name='Key Points',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='Long Straddle Payoff',
    xaxis_title='Stock Price ($)',
    yaxis_title='P&L ($)',
    showlegend=True,
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update x-axis with key values as ticks
fig.update_xaxes(
    range=[80, 120],
    showgrid=True,
    gridwidth=1,
    gridcolor='lightgray',
    tickvals=[80, 85, 90, 93.5, 95, 100, 105, 106.5, 110, 115, 120],
    ticktext=['80', '85', '90', '93.5', '95', '100', '105', '106.5', '110', '115', '120']
)

# Update y-axis with key values as ticks
fig.update_yaxes(
    showgrid=True,
    gridwidth=1,
    gridcolor='lightgray',
    zeroline=True,
    zerolinewidth=2,
    zerolinecolor='black',
    tickvals=[-15, -10, -6.5, -5, 0, 5, 10, 15],
    ticktext=['-15', '-10', '-6.5', '-5', '0', '5', '10', '15']
)

# Save the chart
fig.write_image('straddle_payoff.png')