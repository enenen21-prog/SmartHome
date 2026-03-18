using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Sockets;

namespace MyApi.DTO;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
public sealed class Ipv4AddressAttribute : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        if (value is not string input)
        {
            return false;
        }

        return IPAddress.TryParse(input, out var ip) && ip.AddressFamily == AddressFamily.InterNetwork;
    }
}
