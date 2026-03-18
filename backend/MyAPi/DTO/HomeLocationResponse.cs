namespace MyApi.DTO;

public class HomeLocationResponse
{
    public required string City { get; set; }
    public required string Country { get; set; }
    public DateTime UpdatedAtUtc { get; set; }
}
