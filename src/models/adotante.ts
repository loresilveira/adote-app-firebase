export interface Adotante{
    nome : string;
    moradia_casa: number; // 1-Casa / 2-Apartamento
    moradia_apto: number; // 1-pequeno / 2-médio / 3-grande
    pelagem_curta: number; // 1-curta / 2-longa
    pelagem_longa: number;
    porte_pequeno: number;
    porte_medio: number;
    porte_grande:number;
    sexo_femea: number; // 1- Fêmea / 2- Macho
    sexo_macho:number;
    // amigavel_crianca: string; // 1-Sim / 2-Não
    // guarda: string; // 1-Sim / 2-Não
    // brincadeira: string; // 1- Sim / 2- Não
    // // exercicio: string; // 1- Pouco / 2-Médio / 3-Muito
    // queda_pelo: string; // 1- Pouco / 2-Médio / 3-Muito
    // tendencia_latir: string;  // 1- Pouco / 2-Médio / 3-Muito
}