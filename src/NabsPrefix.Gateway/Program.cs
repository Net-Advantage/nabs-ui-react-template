using Nabs.Launchpad.Core.Gateway;
using Nabs.Launchpad.Core.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddGateway(gatewayOptions =>
{
    var yarpOptions = gatewayOptions.YarpOptions;
    yarpOptions.HeaderName = "X-Nabs-Header";
    yarpOptions.HeaderValue = "NabsIssued";

    var authorizationIssuerOptions = gatewayOptions.AuthorizationIssuerOptions;
    authorizationIssuerOptions.Issuer = "https://nabsgateway";
    authorizationIssuerOptions.Audience = "https://nabsgateway/audience";
    authorizationIssuerOptions.Key = "supersecuresupersecretkeythatnobodyknowsorevershouldnknow";
});

var app = builder.Build();

app.UseHttpsRedirection();

app.Run();