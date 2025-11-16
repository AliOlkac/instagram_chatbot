// Basit env utili
export function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Çevre değişkeni eksik: ${key}`);
  return value;
}
