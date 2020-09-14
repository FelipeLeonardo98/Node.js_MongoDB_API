CRUD API REST criada para estudo seguindo tutorial, NO ENTANTO mudei toda arquitetura:
    Before: raíz: app.js (conexão com MongoDB, todas rotas); folder models;
    After: Divisão de diretórios, encapsulamento de serviços/processos, uso do modelo MVC,
            grupo de routes e toda arquitetura atual.