// =========================================================================
// CONFIGURAÇÃO DO SUPABASE (Seguro - Lê do env.js)
// =========================================================================
const supabaseUrl = window.ENV?.SUPABASE_URL || '';
const supabaseKey = window.ENV?.SUPABASE_KEY || '';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// 1. DADOS DAS QUESTÕES
const questions = [
    {
        text: "No seu dia a dia com a tecnologia, o que mais te deixa curioso para aprender?",
        options: [
            { text: "Descobrir como a internet chega até sua casa e como vários aparelhos se conectam entre si.", weights: { redes: 1 } },
            { text: "Ver sites bonitos e pensar: 'queria saber como criar páginas tão legais e fáceis de usar assim'.", weights: { web: 1 } },
            { text: "Entender como as coisas funcionam 'por trás das cortinas', como a segurança das senhas e o processamento dos cliques.", weights: { backend: 1 } },
            { text: "A facilidade de resolver tudo pelo celular e a vontade de criar seus próprios aplicativos.", weights: { mobile: 1 } }
        ]
    },
    {
        text: "Diante de um computador que parou de iniciar ou está travando demais, qual a sua reação?",
        options: [
            { text: "Tenho vontade de abrir, limpar, ver se tem alguma peça solta ou tentar formatar para resolver logo.", weights: { manutencao: 1 } },
            { text: "Vou direto checar o modem, as luzes do roteador e tentar descobrir se é só a internet que caiu.", weights: { redes: 1 } },
            { text: "Fico curioso para tentar descobrir qual programa causou o erro e como consertar isso digitando comandos no sistema.", weights: { backend: 0.5, web: 0.5 } },
            { text: "Fico pensando em como quem criou o sistema poderia ter feito algo mais inteligente para a gente não perder nosso trabalho na hora do travamento.", weights: { engenharia: 1 } }
        ]
    },
    {
        text: "Em um trabalho em grupo na escola ou num projeto prático, o que você prefere fazer?",
        options: [
            { text: "Ser quem organiza as ideias, decide o que cada um vai fazer e planeja o projeto inteiro antes de começar.", weights: { engenharia: 1 } },
            { text: "Ser a pessoa que organiza as informações, cria planilhas ou pastas e garante que nenhum dado importante se perca.", weights: { banco: 1 } },
            { text: "Colocar a mão na massa na parte visual, desenhando as telas, montando os slides ou criando a 'cara' do projeto.", weights: { web: 0.5, mobile: 0.5 } },
            { text: "Ser o responsável por garantir que a internet, os computadores e os cabos vão funcionar perfeitamente na hora de apresentar.", weights: { redes: 0.5, manutencao: 0.5 } }
        ]
    },
    {
        text: "Pensando no início da sua jornada na tecnologia, o que parece mais legal de aprender primeiro?",
        options: [
            { text: "Aprender o passo a passo de como ensinar o computador a pensar e resolver problemas (Lógica de Programação).", weights: { backend: 0.5, mobile: 0.5 } },
            { text: "Aprender a montar computadores do zero e fazer a comunicação da internet funcionar (Hardware e Redes).", weights: { redes: 0.5, manutencao: 0.5 } },
            { text: "Entender como as pessoas usam a tecnologia e como desenhar telas fáceis de usar (Design de Interfaces).", weights: { engenharia: 0.5, web: 0.5 } },
            { text: "Descobrir como gigantes como Google ou Instagram guardam milhões de fotos de forma organizada (Banco de Dados).", weights: { banco: 1 } }
        ]
    },
    {
        text: "Quando você tem um quebra-cabeça ou um problema difícil para resolver, como você age?",
        options: [
            { text: "Gosto de separar o problema em partes pequenas e organizar tudo com muita lógica até achar a solução invisível.", weights: { backend: 0.5, banco: 0.5 } },
            { text: "Prefiro problemas onde o resultado do meu esforço é visual, podendo ver as coisas ganhando forma e cores na hora.", weights: { web: 0.5, mobile: 0.5 } },
            { text: "Gosto de descobrir onde está o 'fio solto', testando cabos e equipamentos até a comunicação voltar a funcionar.", weights: { redes: 1 } },
            { text: "Vou direto olhar as partes físicas das coisas para ver se tem algo quebrado ou precisando trocar de peça.", weights: { manutencao: 1 } }
        ]
    },
    {
        text: "Se você tivesse que fazer um projeto final no CEET, qual você escolheria com mais empolgação?",
        options: [
            { text: "Fazer um site interativo sobre um assunto que eu gosto, com botões, imagens e animações bem fluidas.", weights: { web: 1 } },
            { text: "Organizar a lista de cadastro de todos os produtos, preços e clientes de uma grande loja virtual para nada sair errado.", weights: { banco: 1 } },
            { text: "Entrevistar pessoas para entender um problema real delas e desenhar a ideia de um sistema do zero para ajudá-las.", weights: { engenharia: 1 } },
            { text: "Dominar os sistemas e peças do computador para poder ajudar outras pessoas a consertarem suas máquinas.", weights: { manutencao: 1 } }
        ]
    },
    {
        text: "Se você pudesse escolher que tipo de equipamento vai ser o foco do seu trabalho todos os dias, o que seria?",
        options: [
            { text: "Celulares e tablets (Android ou iPhone) – as coisas que levamos no bolso.", weights: { mobile: 1 } },
            { text: "Sites e sistemas que a gente acessa pelo navegador no computador de casa.", weights: { web: 0.5, backend: 0.5 } },
            { text: "Computadores gigantes e potentes chamados 'Servidores', que ficam em salas refrigeradas e fazem a internet existir.", weights: { redes: 1 } },
            { text: "O próprio computador ou notebook do usuário comum, trocando peças antigas e deixando tudo mais rápido.", weights: { manutencao: 1 } }
        ]
    },
    {
        text: "Quando você pensa em aprender uma 'Linguagem de Programação', o que você imagina construindo com ela?",
        options: [
            { text: "Digitar códigos que vão ser o 'cérebro' invisível por trás de aplicativos ou sistemas funcionarem perfeitamente.", weights: { backend: 0.5, mobile: 0.5 } },
            { text: "Aprender como esses códigos conseguem salvar e buscar milhares de informações super rápido sem travar.", weights: { banco: 1 } },
            { text: "Usar a linguagem para planejar como todas as partes de um programa vão conversar entre si antes dele ficar pronto.", weights: { engenharia: 1 } },
            { text: "Entender como o código ajuda a criar conexões seguras entre máquinas para evitar que a rede caia.", weights: { redes: 1 } }
        ]
    },
    {
        text: "O tema 'Segurança da Informação' (proteger contra hackers e vírus) te chama atenção de qual forma?",
        options: [
            { text: "Me imagino protegendo a internet de empresas, bloqueando ataques e garantindo que ninguém invada a rede.", weights: { redes: 1 } },
            { text: "Penso em como proteger as senhas das pessoas e garantir que ninguém roube os dados guardados no sistema.", weights: { backend: 0.5, banco: 0.5 } },
            { text: "Acho legal, mas me importo mais em fazer um sistema que seja muito fácil e gostoso das pessoas usarem sem medo.", weights: { engenharia: 0.5, web: 0.5 } },
            { text: "Quero aprender a tirar vírus de computadores lentos e ensinar as pessoas a não clicarem em links falsos.", weights: { manutencao: 1 } }
        ]
    },
    {
        text: "Quando você baixa um aplicativo novo no celular e acha ele muito ruim ou bagunçado, o que você pensa?",
        options: [
            { text: "'Nossa, quem fez isso não pensou nas pessoas. Os botões estão todos escondidos e as cores são ruins!'", weights: { engenharia: 0.5, web: 0.5 } },
            { text: "'Será que esse aplicativo trava tanto porque a programação por trás dele está muito pesada e mal feita?'", weights: { backend: 1 } },
            { text: "'Queria muito aprender a fazer um aplicativo parecido com esse, só que funcionando liso e bem mais bonito.'", weights: { mobile: 1 } },
            { text: "'Imagina que bagunça deve ser onde eles guardam nossas informações para demorar tanto pra carregar uma foto.'", weights: { banco: 1 } }
        ]
    },
    {
        text: "Pensando na reta final do curso, qual parece ser o seu 'projeto de formatura dos sonhos'?",
        options: [
            { text: "Sair do curso conseguindo criar sites modernos e plataformas web completas do zero.", weights: { web: 1 } },
            { text: "Sair do curso sabendo criar aplicativos inovadores para celulares e tablets.", weights: { mobile: 1 } },
            { text: "Sair dominando como conectar, proteger e gerenciar toda a infraestrutura de computadores de uma empresa.", weights: { redes: 1 } },
            { text: "Ter a chance de liderar uma equipe e planejar a construção de um grande software do mundo real.", weights: { engenharia: 1 } }
        ]
    },
    {
        text: "O curso também tem Empreendedorismo (criar novos negócios). Como você se vê no futuro?",
        options: [
            { text: "Tenho vontade de ter minha própria empresa de tecnologia e criar um produto novo que mude a vida das pessoas.", weights: { engenharia: 1 } },
            { text: "Me vejo trabalhando numa grande empresa, sendo o especialista que garante que a internet e os servidores nunca parem.", weights: { redes: 0.5, manutencao: 0.5 } },
            { text: "Quero trabalhar de forma independente, criando sites ou aplicativos sob encomenda para clientes.", weights: { web: 0.5, mobile: 0.5 } },
            { text: "Quero ser um consultor que ajuda grandes empresas a organizarem montanhas de dados importantes.", weights: { banco: 0.5, backend: 0.5 } }
        ]
    },
    {
        text: "Qual seria o seu ambiente e estilo de trabalho ideal na maior parte do dia?",
        options: [
            { text: "Conversando bastante com pessoas, entendendo o que elas precisam e desenhando ideias.", weights: { engenharia: 1 } },
            { text: "Concentrado no computador, focado em resolver problemas lógicos complexos.", weights: { backend: 0.5, banco: 0.5 } },
            { text: "Movimentando-se e com a mão na massa: mexendo em cabos, abrindo máquinas, configurando roteadores.", weights: { redes: 0.5, manutencao: 0.5 } },
            { text: "Focado no visual e no design, escolhendo cores, ajeitando botões e garantindo telas incríveis.", weights: { web: 0.5, mobile: 0.5 } }
        ]
    },
    {
        text: "Escolha a frase que parece mais com o seu sonho de profissão na área de tecnologia:",
        options: [
            { text: "'Eu serei a pessoa que garante que a internet não caia e os computadores da empresa nunca deem problema.'", weights: { redes: 0.5, manutencao: 0.5 } },
            { text: "'Eu serei quem cria os aplicativos e sites bonitos e rápidos que todo mundo acessa no dia a dia.'", weights: { web: 0.5, mobile: 0.5 } },
            { text: "'Eu serei o cérebro que organiza milhares de informações valiosas e garante sistemas rápidos e sem travar.'", weights: { backend: 0.5, banco: 0.5 } },
            { text: "'Eu serei o líder que escuta o que o cliente quer e organiza a equipe para construir o software perfeito.'", weights: { engenharia: 1 } }
        ]
    }
];

// 2. DETALHES DAS ÁREAS - AQUI SEPARAMOS O TEXTO DO EMOJI! E ADICIONAMOS AS CORES
const areaDetails = {
    banco: {
        title: "Banco de Dados",
        emoji: "🗄️",
        image: "Areas/BancoDeDados.png",
        description: "Esta área foca na organização, armazenamento e segurança das informações de uma empresa. O profissional garante que os dados estejam sempre disponíveis e protegidos.",
        perfil: "Pessoas organizadas, com forte raciocínio lógico, atentas a detalhes e que gostam de lidar com grandes volumes de informações e estruturação de sistemas seguros.",
        activities: ["Modelagem de dados", "Criação de consultas SQL", "Otimização de performance", "Segurança da informação"],
        techs: ["MySQL", "PostgreSQL", "Oracle", "MongoDB", "SQL Server"],
        atuacao: ["Administrador de Banco de Dados (DBA)", "Analista de Dados", "Engenheiro de Dados", "Especialista em BI"],
        salary: "<span style='font-size:1.1rem; display:block; text-align:left; color:#A0AEC0; font-weight:600; line-height:1.5;'>• Jr: R$ 4.000,00<br>• Pleno: R$ 7.500,00<br>• Sênior: R$ 13.000,00+</span>",
        opportunities: "Mercado em expansão devido ao Big Data. Empresas precisam de profissionais para gerenciar dados massivos.",
        ceetInfo: "No Módulo II você aprende a base com 'Projeto de Banco de Dados', essencial para qualquer sistema moderno.",
        disciplines: ["Projeto de Banco de Dados", "Estrutura de Dados", "Análise de Sistemas"],
        colorTheme: { solid: "#164DF0", gradient: "linear-gradient(135deg, #0D3BC2 0%, #164DF0 100%)" }
    },
    backend: {
        title: "Desenvolvimento Backend",
        emoji: "🧠",
        image: "Areas/DesenvolvimentoBackend.png",
        description: "É o 'cérebro' por trás dos sites e aplicativos. Cuida da lógica, dos servidores e de como as informações são processadas.",
        perfil: "Pessoas extremamente lógicas e focadas, que gostam de resolver problemas complexos nos bastidores, priorizando desempenho e segurança.",
        activities: ["Criação de APIs", "Integração com bancos de dados", "Segurança do lado do servidor", "Lógica de sistemas"],
        techs: ["Node.js", "Python", "PHP", "Java", "C#"],
        atuacao: ["Desenvolvedor Backend", "Analista de Sistemas", "Arquiteto de Software", "Especialista em APIs e Integrações"],
        salary: "<span style='font-size:1.1rem; display:block; text-align:left; color:#A0AEC0; font-weight:600; line-height:1.5;'>• Jr: R$ 3.800,00<br>• Pleno: R$ 7.000,00<br>• Sênior: R$ 12.000,00+</span>",
        opportunities: "Alta demanda por programadores que saibam construir a infraestrutura invisível dos aplicativos.",
        ceetInfo: "A disciplina de 'Lógica de Programação' e 'Programação Orientada a Objetos' são seus pilares aqui.",
        disciplines: ["Lógica de Programação", "POO", "Estrutura de Dados", "Programação Web"],
        colorTheme: { solid: "#70DE40", gradient: "linear-gradient(135deg, #51B924 0%, #70DE40 100%)" }
    },
    mobile: {
        title: "Desenvolvimento Mobile",
        emoji: "📱",
        image: "Areas/DesenvolvimentoMobile.png",
        description: "Especialista em criar aplicativos para smartphones e tablets, focando em performance e usabilidade móvel.",
        perfil: "Pessoas dinâmicas e criativas que gostam de inovação. Desejam criar produtos acessíveis direto na palma da mão do usuário.",
        activities: ["Criação de apps Android/iOS", "Consumo de APIs móveis", "Publicação nas lojas", "Interfaces touch"],
        techs: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
        atuacao: ["Desenvolvedor de Aplicativos", "Especialista Android/iOS", "Engenheiro Mobile", "Criador de Soluções Cross-Platform"],
        salary: "<span style='font-size:1.1rem; display:block; text-align:left; color:#A0AEC0; font-weight:600; line-height:1.5;'>• Jr: R$ 4.000,00<br>• Pleno: R$ 7.200,00<br>• Sênior: R$ 12.500,00+</span>",
        opportunities: "Um dos mercados que mais cresce, com muitas vagas remotas para quem domina frameworks modernos.",
        ceetInfo: "No Módulo IV você terá a disciplina exclusiva de 'Desenvolvimento para Dispositivos Móveis'.",
        disciplines: ["Desenvolvimento Mobile", "POO", "IHM (Interface Humano-Máquina)"],
        colorTheme: { solid: "#70DE40", gradient: "linear-gradient(135deg, #51B924 0%, #70DE40 100%)" }
    },
    web: {
        title: "Desenvolvimento Web",
        emoji: "🌐",
        image: "Areas/DesenvolvimentoWeb.png",
        description: "Responsável pela 'cara' dos sites. Cria a parte visual e interativa que o usuário final vê e utiliza no navegador.",
        perfil: "Pessoas visuais, atentas ao design e à experiência de uso. Gostam de ver o resultado imediato do seu código.",
        activities: ["Criação de layouts", "Interatividade com JavaScript", "Responsividade", "Consumo de APIs"],
        techs: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"],
        atuacao: ["Desenvolvedor Frontend", "Web Designer", "Desenvolvedor Fullstack", "Especialista em UI/UX"],
        salary: "<span style='font-size:1.1rem; display:block; text-align:left; color:#A0AEC0; font-weight:600; line-height:1.5;'>• Jr: R$ 3.500,00<br>• Pleno: R$ 6.500,00<br>• Sênior: R$ 11.000,00+</span>",
        opportunities: "Toda empresa precisa de uma presença online. Excelente para trabalhos autônomos e agências.",
        ceetInfo: "Você verá isso em 'Fundamentos de Desenvolvimento Web' e 'Programação Web' nos módulos II e IV.",
        disciplines: ["Fundamentos Web", "Programação Web", "Design de Interface"],
        colorTheme: { solid: "#9966FF", gradient: "linear-gradient(135deg, #8B5CF6 0%, #CC99FF 100%)" } // Roxo
    },
    engenharia: {
        title: "Engenharia de Software",
        emoji: "🏗️",
        image: "Areas/EngenhariaDeSoftware.png",
        description: "Foca no planejamento e gestão do ciclo de vida do software, garantindo qualidade, prazos e organização da equipe.",
        perfil: "Pessoas comunicativas, organizadas e com perfil de liderança. Gostam de planejar e coordenar equipes.",
        activities: ["Levantamento de requisitos", "Gestão de projetos Ágeis", "Arquitetura de sistemas", "Liderança de equipes"],
        techs: ["Metodologias Ágeis (Scrum)", "Git/GitHub", "UML", "Jira", "Trello"],
        atuacao: ["Engenheiro de Software", "Gestor de Projetos de TI", "Product Owner (PO)", "Analista de Requisitos"],
        salary: "<span style='font-size:1.1rem; display:block; text-align:left; color:#A0AEC0; font-weight:600; line-height:1.5;'>• Jr: R$ 4.500,00<br>• Pleno: R$ 8.000,00<br>• Sênior: R$ 14.000,00+</span>",
        opportunities: "Papel crucial em médias e grandes empresas de tecnologia para garantir que o software seja entregue corretamente.",
        ceetInfo: "As matérias de 'Análise e Projetos de Sistemas' e 'Empreendedorismo' são cruciais para este perfil.",
        disciplines: ["Análise de Sistemas", "Empreendedorismo", "Ética e Legislação"],
        colorTheme: { solid: "#24BDFF", gradient: "linear-gradient(135deg, #0A9CE3 0%, #24BDFF 100%)" }
    },
    manutencao: {
        title: "Manutenção e Suporte",
        emoji: "🔧",
        image: "Areas/Manutencao.png",
        description: "Lida com o hardware e a base de software. É quem garante que as máquinas e os sistemas operacionais estejam saudáveis.",
        perfil: "Pessoas práticas, investigativas e com perfil 'mão na massa'. Têm paciência e curiosidade para diagnosticar defeitos.",
        activities: ["Montagem de computadores", "Formatação de sistemas", "Troca de componentes", "Suporte ao usuário"],
        techs: ["Hardware", "Windows/Linux", "Drivers", "BIOS/UEFI", "Ferramentas de Diagnóstico"],
        atuacao: ["Técnico em Manutenção de Computadores", "Analista de Suporte (Helpdesk)", "Técnico em Hardware", "Supervisor de Infraestrutura Local"],
        salary: "<span style='font-size:1.1rem; display:block; text-align:left; color:#A0AEC0; font-weight:600; line-height:1.5;'>• Jr: R$ 2.000,00<br>• Pleno: R$ 3.500,00<br>• Sênior: R$ 5.000,00</span>",
        opportunities: "Excelente porta de entrada para o mercado. Toda empresa precisa de suporte técnico presencial ou remoto.",
        ceetInfo: "Logo no Módulo I você aprende 'Instalação e Manutenção', a base prática da profissão.",
        disciplines: ["Instalação e Manutenção", "Sistemas Operacionais", "Aplicativos Computacionais"],
        colorTheme: { solid: "#F59E0B", gradient: "linear-gradient(135deg, #D97706 0%, #FBBF24 100%)" } // Amarelo
    },
    redes: {
        title: "Profissional de Redes",
        emoji: "🌐🛡️",
        image: "Areas/ProfissionalDeRedes.png",
        description: "O arquiteto das conexões. Garante que a internet e as redes internas funcionem com velocidade e segurança total.",
        perfil: "Pessoas focadas, que valorizam a estabilidade, segurança e comunicação de dados. Gostam de arquitetar e gerenciar infraestruturas.",
        activities: ["Configuração de roteadores e switches", "Segurança de redes (Firewalls)", "Cabeamento estruturado", "Administração de servidores"],
        techs: ["Cisco", "TCP/IP", "Wi-Fi", "Linux Server", "VPNs"],
        atuacao: ["Analista de Redes", "Administrador de Infraestrutura", "Especialista em Cibersegurança", "Analista Cloud Computing"],
        salary: "<span style='font-size:1.1rem; display:block; text-align:left; color:#A0AEC0; font-weight:600; line-height:1.5;'>• Jr: R$ 3.500,00<br>• Pleno: R$ 6.000,00<br>• Sênior: R$ 10.000,00+</span>",
        opportunities: "Área essencial para corporações. Especializações em Cloud e Segurança da Informação estão em alta.",
        ceetInfo: "O CEET foca pesado nisso com 'Administração de Sistemas Operacionais de Rede' no Módulo IV.",
        disciplines: ["Fundamentos de Redes", "Segurança da Informação", "Adm. de Sistemas de Rede"],
        colorTheme: { solid: "#24BDFF", gradient: "linear-gradient(135deg, #0A9CE3 0%, #24BDFF 100%)" }
    }
};

// 3. ESTADO DA APLICAÇÃO
let userData = { name: "", age: "", phone: "", city: "" };
let currentQuestionIndex = 0;
let userScores = { redes: 0, web: 0, backend: 0, mobile: 0, engenharia: 0, manutencao: 0, banco: 0 };
let isFinishing = false; // Trava contra cliques duplos

// =========================================================================
// FUNÇÃO PARA MUDAR A COR DO TEMA DINAMICAMENTE
// =========================================================================
function setAppTheme(solidColor, gradientStr) {
    const root = document.documentElement;
    root.style.setProperty('--theme-color-solid', solidColor);
    root.style.setProperty('--theme-gradient', gradientStr);
    root.style.setProperty('--theme-border-glow', `${solidColor}33`); 
    root.style.setProperty('--theme-shadow', `0 8px 32px ${solidColor}26`); 
}

// 4. FUNÇÕES DE FLUXO
function showSection(id) {
    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

function startQuiz(event) {
    event.preventDefault();
    userData.name = document.getElementById('user-name').value;
    userData.age = document.getElementById('user-age').value;
    userData.phone = document.getElementById('user-phone').value;
    userData.city = document.getElementById('user-city').value;

    currentQuestionIndex = 0;
    userScores = { redes: 0, web: 0, backend: 0, mobile: 0, engenharia: 0, manutencao: 0, banco: 0 };
    isFinishing = false; 

    showSection('step-quiz');
    renderQuestion();
}

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('current-question-num').innerText = currentQuestionIndex + 1;
    
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress-bar-fill').style.width = `${progressPercent}%`;
    document.getElementById('question-text').innerText = currentQuestion.text;

    const container = document.getElementById('alternatives-container');
    container.innerHTML = ""; 

    const letters = ['A', 'B', 'C', 'D'];
    currentQuestion.options.forEach((opt, idx) => {
        const button = document.createElement('button');
        button.className = "alt-option";
        button.onclick = () => handleAnswer(opt.weights);
        button.innerHTML = `
            <span class="alt-letter">${letters[idx]}</span>
            <span class="alt-text">${opt.text}</span>
        `;
        container.appendChild(button);
    });
}

function handleAnswer(weights) {
    if (isFinishing) return; 

    for (let key in weights) {
        if (userScores.hasOwnProperty(key)) {
            userScores[key] += weights[key];
        }
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= questions.length) {
        isFinishing = true; 
        finishQuiz();
    } else {
        renderQuestion();
    }
}

async function finishQuiz() {
    let winnerArea = Object.keys(userScores).reduce((a, b) => userScores[a] > userScores[b] ? a : b);
    const data = areaDetails[winnerArea];

    // MÁGICA DAS CORES
    setAppTheme(data.colorTheme.solid, data.colorTheme.gradient);

    document.getElementById('res-user-name').innerText = userData.name;
    
    // AQUI OCORRE A BLINDAGEM DO EMOJI: Injetamos o HTML com as classes específicas
    document.getElementById('res-area-title').innerHTML = `
        <span class="text-gradient">${data.title}</span> 
        <span class="emoji-normal">${data.emoji}</span>
    `;
    
    document.getElementById('res-area-img').src = data.image;
    
    document.getElementById('res-description-long').innerText = data.description;
    document.getElementById('res-perfil').innerText = data.perfil;
    document.getElementById('res-salary').innerHTML = data.salary; 
    document.getElementById('res-opportunities').innerText = data.opportunities;
    document.getElementById('res-ceet-info').innerText = data.ceetInfo;

    // Usando os IDs corretos do seu index.html original
    fillList('res-activities', data.activities);
    fillList('res-techs', data.techs);
    fillList('res-atuacao', data.atuacao);
    fillList('res-disciplines', data.disciplines);

    try {
        const { error } = await supabaseClient
            .from('resultadosvocacionais') 
            .insert([
                { 
                    nome: userData.name, 
                    idade: parseInt(userData.age), 
                    contato: userData.phone, 
                    cidade: userData.city,
                    area_resultado: data.title // Agora ele salva limpo no banco (ex: "Desenvolvimento Web") sem emoji!
                }
            ]);

        if (error) throw error;
        console.log("Sucesso! Dados salvos na tabela resultadosvocacionais.");
    } catch (error) {
        console.error("Erro ao inserir no banco Supabase:", error.message);
    }

    showSection('step-result');
}

function fillList(elementId, items) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        el.appendChild(li);
    });
}

function restartQuiz() {
    // Retorna a cor para Azul Escuro padrão ao refazer o teste
    setAppTheme('#60A5FA', 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)');
    
    document.getElementById('form-register').reset();
    showSection('step-register');
}

// =========================================================================
// MÁSCARA DE TELEFONE EM TEMPO REAL
// =========================================================================
document.getElementById('user-phone').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, ""); 
    if (v.length > 11) v = v.slice(0, 11); 
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    e.target.value = v;
});

// =========================================================================
// BLOQUEIO DE IDADE NEGATIVA E CARACTERES INVÁLIDOS
// =========================================================================
document.getElementById('user-age').addEventListener('input', (e) => {
    // Remove qualquer coisa que não seja número (como o sinal de - ou a letra e)
    let v = e.target.value.replace(/\D/g, ""); 
    
    // Limita a apenas 2 dígitos (ninguém tem 1000 anos)
    if (v.length > 2) v = v.slice(0, 2); 
    
    e.target.value = v;
});

// =========================================================================
// GERAR LISTA DE ÁREAS NA TELA INICIAL (COM IMAGEM)
// =========================================================================
function renderHomeAreas() {
    const container = document.getElementById('home-areas-container');
    if (!container) return;
    container.innerHTML = "";
    
    for (let key in areaDetails) {
        const area = areaDetails[key];
        const card = document.createElement('div');
        card.className = 'home-area-card';
        card.innerHTML = `
            <img src="${area.image}" alt="${area.title}" class="home-area-img">
            <div class="home-area-info">
                <h4>${area.title}</h4>
                <p>${area.description}</p>
            </div>
        `;
        container.appendChild(card);
    }
}
renderHomeAreas();


// =========================================================================
// AUTOCOMPLETAR CIDADES (CUSTOMIZADO PARA FUNCIONAR BEM NO IPHONE/IOS)
// =========================================================================
let ibgeCities = []; // Array que vai guardar as cidades

async function loadCities() {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/32/municipios');
        const cities = await response.json();
        // Guarda as cidades formatadas
        ibgeCities = cities.map(city => `${city.nome} - ES`);
    } catch (error) {
        console.error("Erro ao carregar lista de cidades:", error);
    }
}
loadCities();

const cityInput = document.getElementById('user-city');
const suggestionsList = document.getElementById('city-suggestions');

// Escuta a digitação do usuário
cityInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    suggestionsList.innerHTML = ''; // Limpa a lista anterior

    if (!inputValue) {
        suggestionsList.style.display = 'none';
        return;
    }

    // Filtra as cidades que contêm o que foi digitado
    const filteredCities = ibgeCities.filter(city => city.toLowerCase().includes(inputValue));

    if (filteredCities.length > 0) {
        filteredCities.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            
            // Quando a pessoa clicar na cidade da lista
            li.addEventListener('mousedown', function(e) {
                e.preventDefault(); // Evita que o campo perca o foco antes do clique
                cityInput.value = city;
                suggestionsList.style.display = 'none';
            });
            
            suggestionsList.appendChild(li);
        });
        suggestionsList.style.display = 'block'; // Mostra a lista
    } else {
        suggestionsList.style.display = 'none'; // Esconde se não achar nada
    }
});

// Esconde a lista se o usuário clicar fora do campo
document.addEventListener('click', function(e) {
    if (e.target !== cityInput && e.target !== suggestionsList) {
        suggestionsList.style.display = 'none';
    }
});
