var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.NabsPrefix_Api>("api")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddViteApp("webfrontend", "../NabsPrefix.Frontend")
    .WithReference(api)
    .WaitFor(api);

api.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
