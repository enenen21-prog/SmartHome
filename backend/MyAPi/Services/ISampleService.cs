using MyApi.Models;

public interface ISampleService
{
    Task<Sample> AddSampleAsync(Sample newSample);
    Task<List<Sample>> GetSamplesAsync(int roomId, int deviceId, DateTime fromUtc);
}
