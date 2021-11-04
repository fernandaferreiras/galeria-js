"use strict"

const limparElemento = (elemento) => {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.lastChild)
    }
}

// const pegarImagens = () => fetch(`https://dog.ceo/api/breed/${raca}/images`)

const pegarImagens = (raca) => fetch(`https://dog.ceo/api/breed/${raca}/images`)

const pesquisarImagens = async (evento) => {

    if (evento.key === 'Enter') {
        const raca = evento.target.value

        const imagensResponse = await pegarImagens(raca)
        // const imagens = await pegarImagens()
        const imagens = await imagensResponse.json()

        limparElemento(document.querySelector(".galeria-container"))
        limparElemento(document.querySelector(".slide-container"))

        carregarGaleria(imagens.message)
        carregarSlide(imagens.message)
    }
}

// pesquisarImagens()


// const alunos = ["Marcos", "Hugo", "Marta"]
// const notas = [5, 6, 10]
// alunos[1]
// notas[1]

// const aluno1 = {
//     "nome": "marcos",
//     "notas": [9, 5, 3]

// }

// aluno1.nome
// aluno1.notas[2]

// const imagens = fetch("https://dog.ceo/api/breed/hound/images")
// console.log(imagens)

const imagens = {
    "url": [
        "./img/demon-slayer.jpg",
        "./img/giyu-tomioka.png",
        "./img/inosuke-hashibira.jpg",
        "./img/luas-superiores.jpg",
        "./img/muzan-kibutsuji.png",
        "./img/nezuko-kamado.jpg",
        "./img/tanjiro-kamado.png",
        "./img/zenitsu-agatsuma.jpg",
    ]
}

const limparId = (url) => {
    const ultimaBarra = url.lastIndexOf("/") + 1
    const ultimoPonto = url.lastIndexOf(".")
    return url.substring(ultimaBarra, ultimoPonto).replace("", "-")
    // console.log(url.substring(ultimaBarra, 1)) 

}

// const limparId = (url) => url.replace("./img/", "").split(".")[0].replace(" ", "-")

const criarItem = (urlImagem) => {
    const container = document.querySelector(".galeria-container")

    const novoLink = document.createElement("a")
    novoLink.href = `#${limparId(urlImagem)}`
    novoLink.classList.add("galeria-items")
    novoLink.innerHTML = `<img src="${urlImagem}" alt=""></img>`
    container.appendChild(novoLink)

    // container.innerHTML += `
    //         <a href="${urlImagem}" class="galeria-items">
    //             <img src="${urlImagem}" alt="">
    //         </a>
    //         `

}

const carregarGaleria = (imagens) => imagens.forEach(criarItem)



const criarSlide = (urlImagem, indice, arr) => {
    const container = document.querySelector(".slide-container")
    const novoDiv = document.createElement("div")
    novoDiv.classList.add("slide")
    novoDiv.id = limparId(urlImagem)

    const indiceAnterior = indice <= 0 ? arr.length - 1 : indice - 1
    const idAnterior = limparId(arr[indiceAnterior])

    const indiceProximo = indice >= arr.length - 1 ? 0 : indice + 1
    const idProximo = limparId(arr[indiceProximo])

    novoDiv.innerHTML = `
        <div class="imagem-container">
            <a href="" class="icones fechar">&#10006;</a>
            <a href="#${idAnterior}" class="icones anterior">&#171;</a>
            <img src="${urlImagem}" alt="">
            <a href="#${idProximo}" class="icones proximo">&#187;</a>
        </div>
        `

    container.appendChild(novoDiv)
}

const carregarSlide = (imagens) => imagens.forEach(criarSlide)

// carregarGaleria(imagens.url)
// carregarSlide(imagens.url)

document.querySelector(".pesquisa-container").addEventListener("keypress", pesquisarImagens)