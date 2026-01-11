export type PlanDetaisProps = {
    maxServices: number;
}
export type PlanProps = {
    BASIC: PlanDetaisProps
    PROFESSIONAL: PlanDetaisProps
}
export const PLANS: PlanProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL:{
        maxServices: 50,
    }
}
export const subscriptionPlans = [
    {
        id:"BASIC",
        name:"basic",
        description: "perfeito para clinicas menores",
        oldPrice: "R$ 97,90",
        price:"R$ 27,90",
        features: [
            `Até ${PLANS["BASIC"].maxServices} serviços`,
            `Agendamentos ilimitados`,
            `Suporte`,
            `Relatorios`
        ]
    },
    {
        id:"PROFESSIONAL",
        name:"PROFESSIONAL",
        description: "perfeito para clinicas grandes",
        oldPrice: "R$ 197,90",
        price:"R$ 97,90",
        features: [
            `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
            `Agendamentos ilimitados`,
            `Suporte Prioritario`,
            `Relatorios avançados`
        ]
    }
]