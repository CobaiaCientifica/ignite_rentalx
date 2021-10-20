# Cadastro de carro

**Requisitos funcionais**
- Deve ser possível cadastrar um novo carro

**Requisitos não funcionais**
\-

**Regras de negócio**
- Não deve ser possível cadastrar um carro com uma placa já existente
- O carro deve ser cadastrado por padrão como disponível
- O usuário responsável pelo cadastro deve ser um usuário administrador

# Listagem de carros

**Requisitos funcionais**
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

**Requisitos não funcionais**
\-

**Regras de negócio**
- O usuário não precisa estar logado no sistema

# Cadastro de especificação no carro


**Requisitos funcionais**
- Deve ser possível cadastrar uma especificação para um carro

**Requisitos não funcionais**
\-

**Regras de negócio**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário administrador

# Cadastro de imagens do carro

**Requisitos funcionais**
- Deve ser possível cadastrar a imagem do carro

**Requisitos não funcionais**
- Utilizar o multer para upload dos arquivos

**Regras de negócio**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário administrador

# Aluguel de carro

**Requisitos funcionais**
- Deve ser possível cadastrar um aluguel

**Requisitos não funcionais**
\-

**Regras de negócio**
- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro

**Requisitos Funcionais**
- Deve ser possível realizar a devolução de um carro

**Requisitos não funcionais**
\-

**Regras de negócio**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrada diária completa
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
- Ao realizar a devolução, deverá ser calculado o total do aluguel
- Caso o horário de devolução seja superior aou horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso
- Caso haja multa, deverá ser somada ao total do aluguel
- O usuário deve estar logado na aplicação

# Listagem de aluguéis para usuário

**Requisitos funcionais**
- Deve ser possível realizar a busca de todos os aluguéis para o usuário

**Requisitos não funcionais**
\-

**Regras de negócio**

- O usuário deve estar logado na aplicação

# Recuperar senha

**Requisitos Funcionais**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**Requisitos não funcionais**
\-

**Regras de negócio**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas