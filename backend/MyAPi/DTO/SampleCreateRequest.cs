using System;
using System.ComponentModel.DataAnnotations;

namespace MyApi.DTO;

public class SampleCreateRequest
{
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

    public DateTime? TimestampUtc { get; set; }
}
