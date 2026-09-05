using Nabs.Launchpad.Core.Apis;
using NabsPrefix.Dtos;
using NabsPrefix.Domain;

namespace NabsPrefix.Api.Endpoints.WeatherEndpoints;

public sealed class GetWeatherEndpoint : NabsEndpointBase
{
    public GetWeatherEndpoint()
        : base(new NabsEndpointOptions("/api/weather", HttpMethod.Get)
        {
            EndpointName = "GetWeather",
            Tags = ["Weather"],
            Summary = "Get a 5-day weather forecast."
        })
    {
    }

    protected override async Task<IResult> HandleAsync(HttpContext httpContext, CancellationToken cancellationToken)
    {
        var service = new WeatherService();
        var result = await service.GetWeatherForecast(new WeatherRequest(5));

        return ParseResult(result);
    }
}
