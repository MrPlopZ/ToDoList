using Microsoft.EntityFrameworkCore;
using ToDoListBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext para MySQL (Pomelo)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// Añadir CORS antes de Build
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevClient",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Registrar controladores
builder.Services.AddControllers();

// Agregar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware pipeline
app.UseRouting();

app.UseCors("AllowAngularDevClient");

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    // Habilitar middleware para Swagger
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
