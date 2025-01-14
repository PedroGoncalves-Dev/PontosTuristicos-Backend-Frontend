const Sobre = () => {
  return (
    <div className="container px-4 py-12 bg-white ">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">
        Sistema de Gerenciamento de Pontos Turísticos
      </h1>

      <section className="prose prose-slate max-w-none">
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <p className="mb-6 leading-relaxed text-gray-700">
            Nossa aplicação é um sistema completo para gerenciamento de pontos
            turísticos, permitindo aos usuários cadastrar e visualizar
            informações detalhadas sobre locais de interesse turístico.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2">
          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Backend
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600">
                Desenvolvido com C# e ASP.NET Core, implementando uma
                arquitetura em camadas com Dapper como micro-ORM para acesso
                otimizado ao SQL Server.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Frontend
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600">
                Construído com React e TypeScript, utilizando shadcn/ui para
                componentes modernos e design consistente, estilizado com
                tailwind css.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 mb-8 rounded-lg bg-blue-50">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Formulários e Validação
          </h2>
          <p className="text-gray-600">
            Utiliza React Hook Form com Zod para validação robusta e tipagem
            segura dos dados.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-green-50">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Funcionalidades Principais
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
              Cadastro de novos pontos turísticos
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
              Visualização de lista completa de pontos turísticos
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
              Acesso a detalhes específicos de cada local
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
              Gerenciamento de informações como endereço e descrição
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
              Integração com serviços de geolocalização
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
