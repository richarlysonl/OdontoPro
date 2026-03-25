criado e desenvolvido com base nas video aula de Matheus Fraga no curso Desenvolver um SaaS do zero ao profissional com Next JS, TypeScript, Banco de dados, Stripe pagamentos
run on (https://odonto-pro-one.vercel.app)
# Sistema SaaS de Gerenciamento de Clínicas

Aplicação fullstack desenvolvida com foco em arquitetura moderna utilizando Next.js, voltada para gerenciamento de clínicas no modelo SaaS (Software as a Service).

O sistema permite que múltiplos usuários gerenciem seus próprios serviços de forma isolada, com autenticação segura e integração com sistema de pagamentos.

---

## Visão Geral

Este projeto foi desenvolvido com o objetivo de aplicar na prática conceitos avançados de desenvolvimento web, incluindo:

* Arquitetura baseada em Server Actions
* Controle de autenticação no servidor
* Integração com gateway de pagamento (Stripe)
* Organização escalável de código
* Validação robusta de dados

---

## Tecnologias e Ferramentas

* Next.js (App Router)
* React
* TypeScript
* Prisma ORM
* Zod (validação de dados)
* Sistema de autenticação (Auth.js / NextAuth)
* Stripe (pagamentos)
* Vercel (deploy)

---

## Principais Funcionalidades

* Autenticação de usuários com controle de sessão
* Isolamento de dados por usuário (multi-tenant básico)
* Cadastro e gerenciamento de serviços
* Definição de preço e duração dos serviços
* Validação de dados no backend utilizando Zod
* Integração com Stripe para pagamentos
* Uso de Server Actions para comunicação segura entre frontend e backend

---


## Arquitetura e Decisões Técnicas

O projeto foi estruturado seguindo boas práticas do ecossistema Next.js moderno:

* Uso de Server Actions para evitar exposição de lógica sensível no client
* Separação entre camadas (actions, schemas, banco de dados)
* Prisma como ORM para abstração e produtividade no acesso ao banco
* Validação centralizada com Zod para garantir integridade dos dados
* Autenticação validada diretamente no servidor em todas as operações críticas

---

## Segurança

* Verificação de sessão em operações sensíveis
* Validação de entrada de dados no backend
* Restrição de acesso baseada no usuário autenticado
* Proteção contra execução de ações sem contexto de requisição

---

## Pagamentos

Integração com Stripe para gerenciamento de pagamentos, simulando um fluxo real de monetização em aplicações SaaS.

---

## Deploy

A aplicação foi publicada utilizando Vercel, aproveitando integração contínua e suporte nativo ao Next.js.

---

## Diferenciais do Projeto

* Aplicação de arquitetura moderna com Server Actions
* Integração real com sistema de pagamentos
* Estrutura pensada para escalabilidade
* Separação clara de responsabilidades
* Foco em segurança e boas práticas

---

## Objetivo

Este projeto faz parte do meu portfólio como forma de demonstrar habilidades em desenvolvimento fullstack, incluindo:

* Construção de aplicações SaaS
* Integração com APIs externas
* Estruturação de projetos escaláveis
* Boas práticas de segurança e validação

---

## Screenshots

### Dashboard
Overview of appointments and reminders management.
<img width="1293" height="587" alt="Captura de tela 2026-03-25 155253" src="https://github.com/user-attachments/assets/083d7fac-4648-48cf-9658-76429846ca38" />


### Services Management
Create, edit and manage clinic services with pricing and duration.
<img width="1314" height="528" alt="Captura de tela 2026-03-25 155541" src="https://github.com/user-attachments/assets/d120bfa8-3bb7-42c3-b47c-f47d6760ed93" />


### Public Clinic View
Public page where patients can view clinics and schedule appointments.
<img width="1278" height="590" alt="Captura de tela 2026-03-25 155754" src="https://github.com/user-attachments/assets/1bb3cc82-54ba-4c3c-8a70-cb4bbc4f50ae" />


### Subscription Plan
Manage subscription plans and access control features.
<img width="1310" height="445" alt="Captura de tela 2026-03-25 160120" src="https://github.com/user-attachments/assets/45e3416f-a281-416c-9af1-80dc199fa4a8" />

## Autor

Desenvolvido por Richarlyson Luan Andrade.

# SaaS Clinic Management System

Fullstack web application built with a modern architecture using Next.js, focused on clinic management within a SaaS (Software as a Service) model.

The system allows multiple users to manage their own services independently, with secure authentication and integrated payment processing.

---

## Overview

This project was developed to apply advanced web development concepts in practice, including:

* Server Actions architecture
* Server-side authentication control
* Integration with a payment gateway (Stripe)
* Scalable code organization
* Robust data validation

---

## Technologies and Tools

* Next.js (App Router)
* React
* TypeScript
* Prisma ORM
* Zod (data validation)
* Authentication system (Auth.js / NextAuth)
* Stripe (payments)
* Vercel (deployment)

---

## Core Features

* User authentication with session control
* Data isolation per user (multi-tenant approach)
* Service creation and management
* Price and duration configuration for services
* Backend data validation using Zod
* Stripe integration for payment processing
* Secure client-server communication using Server Actions

---

## Architecture and Technical Decisions

The project follows modern best practices in the Next.js ecosystem:

* Server Actions to prevent exposing sensitive logic on the client
* Clear separation of concerns (actions, schemas, database)
* Prisma ORM for efficient database interaction
* Centralized validation with Zod
* Authentication enforced on the server for critical operations

---

## Security

* Session validation on sensitive operations
* Backend data validation
* Access control based on authenticated user
* Protection against execution outside request scope

---

## Payments

Integrated with Stripe to handle payments, simulating a real SaaS monetization flow.

---

## Deployment

The application is deployed on Vercel, leveraging its native support for Next.js and continuous deployment.

---

## Highlights

* Modern architecture using Server Actions
* Real-world payment integration
* Scalable and maintainable structure
* Strong focus on security and validation

---

## Purpose

This project is part of my portfolio and aims to demonstrate my skills in:

* Fullstack development
* SaaS application architecture
* API integration
* Scalable system design

---
## Screenshots

### Dashboard
Overview of appointments and reminders management.
<img width="1293" height="587" alt="Captura de tela 2026-03-25 155253" src="https://github.com/user-attachments/assets/083d7fac-4648-48cf-9658-76429846ca38" />


### Services Management
Create, edit and manage clinic services with pricing and duration.
<img width="1314" height="528" alt="Captura de tela 2026-03-25 155541" src="https://github.com/user-attachments/assets/d120bfa8-3bb7-42c3-b47c-f47d6760ed93" />


### Public Clinic View
Public page where patients can view clinics and schedule appointments.
<img width="1278" height="590" alt="Captura de tela 2026-03-25 155754" src="https://github.com/user-attachments/assets/1bb3cc82-54ba-4c3c-8a70-cb4bbc4f50ae" />


### Subscription Plan
Manage subscription plans and access control features.
<img width="1310" height="445" alt="Captura de tela 2026-03-25 160120" src="https://github.com/user-attachments/assets/45e3416f-a281-416c-9af1-80dc199fa4a8" />

## Author

Developed by Richarlyson Luan Andrade

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  or https://odonto-pro-one.vercel.app.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

  https://odonto-pro-one.vercel.app
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
