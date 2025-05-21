const dados = {
    "receitas": [
        {
            "id": 1,
            "nome": "Bolo de Cenoura com Cobertura de Chocolate",
            "descricao_breve": "Um clássico delicioso e fofinho.",
            "ingredientes": ["3 cenouras médias", "4 ovos", "1 xícara de óleo", "2 xícaras de açúcar", "2 xícaras de farinha de trigo", "1 colher de sopa de fermento em pó"],
            "preparo": "Bata no liquidificador as cenouras, os ovos e o óleo. Em uma tigela, misture o açúcar e a farinha. Adicione a mistura do liquidificador e o fermento. Asse em forno pré-aquecido.",
            "tempo_preparo": "40 minutos",
            "rendimento": "12 porções",
            "categoria": "Bolos",
            "destaque": true,
            "imagem_principal": "imagens/bolo_cenoura.jpg",
            "fotos_adicionais": [
                { "titulo": "Bolo pronto", "src": "imagens/bolo_cenoura_fatia.jpg" },
                { "titulo": "Ingredientes", "src": "imagens/ingredientes_bolo_cenoura.jpg" }
            ]
        },
        {
            "id": 2,
            "nome": "Lasanha à Bolonhesa",
            "descricao_breve": "Uma receita tradicional e reconfortante.",
            "ingredientes": ["Massa para lasanha", "Carne moída", "Molho de tomate", "Queijo muçarela", "Cebola", "Alho", "Azeite"],
            "preparo": "Refogue a carne moída com cebola e alho, adicione o molho de tomate. Monte a lasanha intercalando massa, molho e queijo. Leve ao forno para gratinar.",
            "tempo_preparo": "1 hora",
            "rendimento": "8 porções",
            "categoria": "Massas",
            "destaque": true,
            "imagem_principal": "imagens/lasanha.jpg",
            "fotos_adicionais": [
                { "titulo": "Lasanha montada", "src": "imagens/lasanha_montada.jpg" },
                { "titulo": "Molho bolonhesa", "src": "imagens/molho_bolonhesa.jpg" }
            ]
        },
        {
            "id": 3,
            "nome": "Salada Caprese",
            "descricao_breve": "Simples, fresca e deliciosa.",
            "ingredientes": ["Tomate", "Mussarela de búfala", "Manjericão fresco", "Azeite extra virgem", "Sal", "Pimenta do reino"],
            "preparo": "Corte os tomates e a mussarela em rodelas. Monte em um prato alternando tomate, mussarela e folhas de manjericão. Regue com azeite e tempere com sal e pimenta.",
            "tempo_preparo": "10 minutos",
            "rendimento": "2 porções",
            "categoria": "Saladas",
            "destaque": false,
            "imagem_principal": "imagens/salada_caprese.jpg",
            "fotos_adicionais": [
                { "titulo": "Salada pronta", "src": "imagens/salada_pronta.jpg" },
                { "titulo": "Ingredientes", "src": "imagens/ingredientes_salada.jpg" }
            ]
        }
    ]
};

// Código para a página index.html
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.getElementById('carouselInner');
    const gridReceitas = document.getElementById('gridReceitas');
    const receitasDestaque = dados.receitas.filter(receita => receita.destaque);

    // Carrossel de destaques
    if (carouselInner) {
        receitasDestaque.forEach((receita, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }
            carouselItem.innerHTML = `
                <img src="${receita.imagem_principal}" alt="${receita.nome}">
                <h3>${receita.nome}</h3>
                <p>${receita.descricao_breve}</p>
                <a href="detalhes.html?id=${receita.id}" class="btn">Ver Detalhes</a>
            `;
            carouselInner.appendChild(carouselItem);
        });
    }

    // Grade de receitas
    if (gridReceitas) {
        dados.receitas.forEach(receita => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${receita.imagem_principal}" class="card-img-top" alt="${receita.nome}">
                <div class="card-body">
                    <h5 class="card-title">${receita.nome}</h5>
                    <p class="card-text">${receita.descricao_breve}</p>
                    <a href="detalhes.html?id=${receita.id}" class="btn btn-primary">Detalhes</a>
                    <span>&#9734;</span> <!-- Adicionando um símbolo de estrela (favorito) -->
                </div>
            `;
            gridReceitas.appendChild(card);
        });
    }

    // Código para a página detalhes.html
    const detalhesContainer = document.getElementById('detalhes-container');
    if (detalhesContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const receitaId = parseInt(urlParams.get('id'));
        const receita = dados.receitas.find(r => r.id === receitaId);

        if (receita) {
            const infoGeralDiv = document.getElementById('info-geral');
            const fotosDiv = document.getElementById('fotos');

            if (infoGeralDiv) {
                infoGeralDiv.innerHTML = `
                    <h3>${receita.nome}</h3>
                    <p>${receita.descricao_breve}</p>
                    <ul>
                        <li><strong>Ingredientes:</strong> ${receita.ingredientes.join(', ')}</li>
                        <li><strong>Preparo:</strong> ${receita.preparo}</li>
                        <li><strong>Tempo de Preparo:</strong> ${receita.tempo_preparo}</li>
                        <li><strong>Rendimento:</strong> ${receita.rendimento}</li>
                        <li><strong>Categoria:</strong> ${receita.categoria}</li>
                    </ul>
                `;
            }

            if (fotosDiv) {
                let fotosHtml = '';
                receita.fotos_adicionais.forEach(foto => {
                    fotosHtml += `
                        <div>
                            <img src="${foto.src}" alt="${foto.titulo}">
                            <p>${foto.titulo}</p>
                        </div>
                    `;
                });
                fotosDiv.innerHTML = fotosHtml;
            }

        } else {
            detalhesContainer.innerHTML = `
                <p>Receita não encontrada.</p>
            `;
        }
    }
});