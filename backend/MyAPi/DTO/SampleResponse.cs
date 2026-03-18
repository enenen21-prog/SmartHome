namespace MyApi.DTO;

public class SampleResponse
{
    public int Id { get; set; }
    public int DeviceId { get; set; }
    public double Temperature { get; set; }
    public double Humidity { get; set; }
    public double Light { get; set; }
    public double Co2 { get; set; }
    public DateTime TimestampUtc { get; set; }
}
