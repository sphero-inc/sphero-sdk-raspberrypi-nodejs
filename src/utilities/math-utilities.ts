export class MathUtilities {
    public static mod(n: number, m: number): number {
        return ((n % m) + m) % m;
    }
}