export default function assert(
  condition: unknown,
  error: Error | string = new Error("타입이 일치하지 않아요.")
): asserts condition {
  if (!condition) {
    throw typeof error === "string" ? new Error(error) : error;
  }
}
