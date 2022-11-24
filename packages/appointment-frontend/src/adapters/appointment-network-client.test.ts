import { AppointmentNetworkClient } from "./appointment-network-client";

describe("AppointmentNetworkClient", () => {
  const HOST = "https://host.com";

  const unmockFetch = global.fetch;
  const mockFetch = jest.fn();

  const networkClient = new AppointmentNetworkClient(HOST);

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterAll(() => {
    global.fetch = unmockFetch;
  });

  it("should send the get request to the provided resource", async () => {
    mockFetch.mockResolvedValueOnce(new Response("dummy-response"));

    const data = await networkClient.get<string>("/dummy");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(data).toBe("/dummy");
  });
});
