using Microsoft.AspNetCore.SignalR;
using NabsPrefix.Dtos;

namespace NabsPrefix.Api.Endpoints.WeatherEndpoints;

public sealed class WeatherHub : Hub
{
    public async Task SendWeatherUpdate(WeatherForecast forecast)
    {
        await Clients.All.SendAsync("ReceiveWeatherUpdate", forecast);
    }
}
