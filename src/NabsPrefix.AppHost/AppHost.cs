var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.NabsPrefix_Api>("api")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddViteApp("frontend", "../NabsPrefix.Frontend")
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
