using Nabs.Launchpad.Core.Apis;

namespace NabsPrefix.Api.Endpoints.WeatherEndpoints;

public sealed class GetWeatherEndpoint : NabsEndpointBase
{
    private static readonly string[] Summaries =
    [
        "Freezing",
        "Bracing",
        "Chilly",
        "Cool",
        "Mild",
        "Warm",
        "Balmy",
        "Hot",
        "Sweltering",
        "Scorching"
    ];

    public GetWeatherEndpoint()
        : base(new NabsEndpointOptions("/api/weather", HttpMethod.Get)
        {
            EndpointName = "GetWeather",
            Tags = ["Weather"],
            Summary = "Get a 5-day weather forecast."
        })
    {
    }

    protected override Task<IResult> HandleAsync(HttpContext httpContext, CancellationToken cancellationToken)
    {
        var forecast = Enumerable.Range(1, 5)
            .Select(index => new WeatherForecast(
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]))
            .ToArray();

        return Task.FromResult<IResult>(Results.Ok(forecast));
    }
}

public sealed record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
