using Microsoft.AspNetCore.Mvc;

namespace MyApi.Controllers;

public static class ApiResults
{
    public static ObjectResult Result(object? payload, int statusCode)
    {
        return new ObjectResult(payload) { StatusCode = statusCode };
    }

    public static ObjectResult Message(string message, int statusCode)
    {
        return new ObjectResult(new { message }) { StatusCode = statusCode };
    }
}
