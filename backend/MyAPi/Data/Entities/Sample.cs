using System.ComponentModel.DataAnnotations;

namespace MyApi.Models;

public class Sample
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int DeviceId { get; set; }

    [Required]
    public double Temperature { get; set; }

    [Required]
    public double Humidity { get; set; }

    [Required]
    public double Light { get; set; }

    [Required]
    public double Co2 { get; set; }

    [Required]
    public DateTime TimestampUtc { get; set; }
}
