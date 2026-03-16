using MyApi.Models;

public interface ISampleService
{
    Task<Sample> AddSampleAsync(Sample newSample);
}
