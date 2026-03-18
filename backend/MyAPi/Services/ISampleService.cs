using MyApi.Models;

public interface ISampleService
{
    /*
    Description: Adds a new sample record.
    Input: newSample (Sample) - sample to create.
    Return: The created Sample entity.
    */
    Task<Sample> AddSampleAsync(Sample newSample);

    /*
    Description: Retrieves samples for a device in a room from a given start time.
    Input: roomId (int) - room identifier; deviceId (int) - device identifier; fromUtc (DateTime) - start time.
    Return: List of samples ordered by timestamp.
    */
    Task<List<Sample>> GetSamplesAsync(int roomId, int deviceId, DateTime fromUtc);
}
