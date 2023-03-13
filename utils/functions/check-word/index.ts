export const checkWord = (
  language: 'de' | 'en' | 'es' | 'fr' | null = 'es'
): CheckWord => ({
  check: async (word: string): Promise<boolean> => {
    const data = await import(`./words/${language}.txt`);
    const content = await fetch(data.default);
    const text = await content.text();
    const regex = new RegExp('\n' + word + '\n');

    return !!text.toString().match(regex)?.[0];
  },
});
