"use client";
import { useRef, useState, useEffect, use } from "react";
import { Menu, Clock , ChevronLeft, ChevronRight, ArrowLeft, PlusCircle, Plus, Minus, ShoppingBag, Check, Pencil, Trash2, ShoppingCart, X, CheckCircle, CookingPot, Truck, XCircle, PackageCheck,Loader, ArchiveIcon, Divide  } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Combobox } from "@headlessui/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons'









export default function MiguelitoPizzaria({ comercio }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navRef = useRef(null);
  const [showEsquerda, setShowEsquerda] = useState(false);
  const [showDireita, setShowDireita] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
const [produtoSelecionado, setProdutoSelecionado] = useState(null);
const [quantidade, setQuantidade] = useState(1)

const [modalSaboresAberto, setModalSaboresAberto] = useState(false);
const [termoBusca, setTermoBusca] = useState("");
const [saboresSelecionados, setSaboresSelecionados] = useState([]);
  // Estado para controlar qual categoria está aberta (id da categoria)
  const [categoriaAberta, setCategoriaAberta] = useState(null);

  const [rascunhoSabores, setRascunhoSabores] = useState([]);
  const [modalCarrinhoAberto, setModalCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [entregaTipo, setEntregaTipo] = useState(""); // valor inicial
    const [modalAbertoDelivery, setModalAbertoDelivery] = useState(false);
    const [cep, setCep] = useState("");
  const [naoSeiCep, setNaoSeiCep] = useState(false);
  const [cidade, setCidade] = useState("");
  const [descricaoPedidos, setDescricaoPedidos] = useState({});

  //USE STATES PARA CLIENTES
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [enderecoCliente, setEnderecoCliente] = useState("");
  const [numeroCasaCliente, setNumeroCasaCliente] = useState("");
  const [bairroCliente, setBairroCliente] = useState("");
  const [complementoCliente, setComplementoCliente] = useState("");
  const [modalAbertoRetirada, setModalAbertoRetirada] = useState(false);
  const [observacaoRetirada, setObservacaoRetirada] = useState("");
    const [dadosBairro, setDadosBairro] = useState([]);
  const [modalAbertoPagamento, setModalAbertoPagamento] = useState(false);
    const [formaPagamento, setFormaPagamento] = useState("");
    const [trocoPara, setTrocoPara] = useState(""); // valor do troco se for dinheiro

    const [confirmarPagamento, setConfirmarPagamento] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(""); // valores: "ENTREGA", "RETIRADA", "PAGAMENTO"
  const [query, setQuery] = useState("R$ 0,00");
  const [aberto, setAberto] = useState(false);
  const [ showModalHorarios, setShowModalHorarios ] = useState(false);
    const [modalAbertoPedidos, setModalAbertoPedidos] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [idCliente, setIdCliente] = useState("");
    const [mostrarFinalizados , setMostrarFinalizados] = useState(false);
    const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
    const [pedidoAbertoId, setPedidoAbertoId] = useState(null);
    const [ listarMotoboy, setListarMotoboy ] = useState([]);




  




const handleChangeDescricao = (idProduto, texto) => {
  setDescricaoPedidos((prev) => ({
    ...prev,
    [idProduto]: texto,
  }));
};



  const bairrosFiltrados = query === "" ? dadosBairro: dadosBairro.filter((bairro) => bairro.nome.toLowerCase().includes(query.toLowerCase()));





  
useEffect( () => {

  if (modalCarrinhoAberto && carrinho.length === 0){
    setModalCarrinhoAberto(false)
  }
},[carrinho, modalCarrinhoAberto])





    //REQUISIÇÃO PARA LISTAR TODOS OS BAIRROS CADASTRADO PELO CLIENTE!!

  async function loadBairros() {

    try {
      const response = await api.get("/bairros")
      setDadosBairro(response.data)
    } catch(error) {
      toast.error(" Erro ao buscar bairros")
    }
}
  
useEffect( () => {
  loadBairros()
}, [comercio.id])



  
    // FIM DA REQUISIÇÃO DE LISTAGEM DE BAIRROS

useEffect(() => {
  const cepLimpo = cep.replace(/\D/g, ""); // remove traços

  if (cepLimpo === "12970000") {
    // Se for o CEP exato que você quer permitir
    setCidade("Piracaia");
  } else {
    setCidade("---"); // Qualquer outro CEP mostra ---
  }
}, [cep]);


  

  function abrirDelivery() {
    setEntregaTipo("ENTREGA");
    setModalAbertoDelivery(true);
  }

  function abrirRetirar() {
    setEntregaTipo("RETIRADA");
    setModalAbertoRetirada(true);
  }



  //FUNÇÃO PARA REMOVER ITEM DO CARRINHO
function removerItemDoCarrinho(id) {
  setCarrinho( (prev)=> prev.filter( (item) => item.id !== id))
}




  

const adicionarAoCarrinho = (produto, sabores, quantidade) => {
  const item = {
    id: Date.now(), // ID temporário
    produto,
    sabores,
    quantidade,
    total: calcularTotal(sabores) * quantidade, // usa sua função de total
  };

  setCarrinho((prev) => [...prev, item]);
  setModalAberto(false); // Fecha o modal de produto
  setSaboresSelecionados([]); // Limpa sabores selecionados
  setQuantidade(1); // Reseta quantidade
  setModalCarrinhoAberto(false); // Abre modal do carrinho
};


//está somando corretamente o total de unidades no carrinho. Por isso, se você tem: 1 item com quantidade 1 item com quantidade 11 O total será 12. 
const carrinhoTotal = carrinho.reduce( (add,item) => add + item.total, 0);


  useEffect(() => {
    if (modalSaboresAberto) {
      setRascunhoSabores(saboresSelecionados);
    }
  }, [modalSaboresAberto]);

const toggleSabor = (produto) => {
  const existe = saboresSelecionados.some((s) => s.id === produto.id);


  if (existe) {
    // Remove o sabor clicado
    setSaboresSelecionados((prev) =>
      prev.filter((s) => s.id !== produto.id)
    );
  } else if (saboresSelecionados.length < 2) {
    // Adiciona sabor se ainda não atingiu o limite de 2 adicionais
    setSaboresSelecionados((prev) => [...prev, produto]);
  }
};









// Calcula o preço total de um item no carrinho, considerando o maior preço entre o produto principal e seus sabores,
// multiplicado pela quantidade desse item.
const calcularPrecoItem = (item) => {
  // Pega os preços do produto e dos sabores
  const precos = [item.produto.preco, ...item.sabores.map(sabor => sabor.preco)];
  // Seleciona o maior preço entre eles
  const maiorPreco = Math.max(...precos);

  // Retorna o preço multiplicado pela quantidade
  return maiorPreco * item.quantidade;
};





// Calcula o valor total do carrinho somando o preço de cada item usando a função calcularPrecoItem.
// Retorna o valor total com duas casas decimais.
function calcularCarrinho() {
  return carrinho.reduce((add, item) => {
    return add + calcularPrecoItem(item);
  }, 0).toFixed(2);
}

// Calcula o preço total do produto selecionado considerando os sabores escolhidos e a quantidade.
// Utiliza o maior preço entre o produto e os sabores para calcular o valor final.
// Retorna o valor formatado com duas casas decimais.
const calcularTotal = () => {
  if (!produtoSelecionado) return "0.00";

  const precos = [produtoSelecionado.preco, ...saboresSelecionados.map(sabor => sabor.preco)];
  const maiorPreco = Math.max(...precos);

  return (quantidade * maiorPreco).toFixed(2);
};

// Calcula o valor total do carrinho somado à taxa de entrega (se existir).
// Converte os valores para números, soma, e retorna o resultado com duas casas decimais.
// Caso algum valor não esteja definido, assume zero para evitar erros.
function calcularTotalComTaxa() {
  const totalCarrinho = parseFloat(calcularCarrinho()) || 0;
  const taxaEntrega = parseFloat(bairroCliente?.taxa_entrega) || 0;

  return (totalCarrinho + taxaEntrega).toFixed(2);
}



useEffect( () => {
  if(modalAberto){
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  // Limpeza quando o componente desmontar
  return () => {
    document.body.style.overflow = "";
  };

},[modalAberto])






//FUNÇÃO PARA NAO TER ROLAGEM DE NADA ALEM DO modalCarrinhoAberto  QUANDO ELE TIVER ABERTO
useEffect(() => {
  if(modalCarrinhoAberto) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = ""
  }

  // Limpeza quando o componente desmontar
  return () => {
    document.body.style.overflow = "";
  };

}, [modalCarrinhoAberto])







//FUNÇÃO PARA NAO TER ROLAGEM DE NADA ALEM DO MODAL MOSTRAR FINALIZADOS QUANDO ELE TIVER ABERTO
useEffect( () => {
  document.body.style.overflow = mostrarFinalizados ? "hidden" : "auto"

  return () => {
    document.body.style.overflow = "";
  }

},[mostrarFinalizados])




//FUNÇÃO PARA NAO TER ROLAGEM DE NADA ALEM DO MODAL MOSTRAR MODAL ABERTO PEDIDOS  QUANDO ELE TIVER ABERTO
useEffect( () => {
  document.body.style.overflow = modalAbertoPedidos ? "hidden" : "auto"

  return () => {
    document.body.style.overflow = "";
  }

},[modalAbertoPedidos])






useEffect( () => {
  document.body.style.overflow = aberto ? "hidden" : "auto"

  return () => {
    document.body.style.overflow = "";
  }

},[aberto])







  useEffect(() => {
    async function getProdutos() {
      try {
        const response = await api.get(`/publico/produto/${comercio.id}`);
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    async function getCategorias() {
      try {
        const response = await api.get(`/categorias`, {
          params: { comercioId: comercio.id },
        });
        setCategorias(response.data);
         // Espera o DOM renderizar e checa as setas
    setTimeout(() => {
      checkScrollButtons();
    }, 100);

      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    if (comercio?.id) {
      getProdutos();
      getCategorias();
    }
  }, [comercio.id]);

  // Controle dos botões de scroll do nav
  const checkScrollButtons = () => {
    const nav = navRef.current;
    if (!nav) return;
    setShowEsquerda(nav.scrollLeft > 0);
    setShowDireita(nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 1);
  };

  const scrollLeft = () => {
    navRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    navRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    checkScrollButtons();
    const handleScroll = () => checkScrollButtons();
    nav.addEventListener("scroll", handleScroll);
    return () => nav.removeEventListener("scroll", handleScroll);
  }, []);








  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    checkScrollButtons();
    const handleScroll = () => checkScrollButtons();
    nav.addEventListener("scroll", handleScroll);
    return () => nav.removeEventListener("scroll", handleScroll);
  }, []);

  



function handleConfirmarPagamento() {
  if (!formaPagamento) {
    toast.error("Por favor, selecione a forma de pagamento.");
    return;
  }

  if (formaPagamento === "DINHEIRO") {
    let valorTroco = null;

    const totalPedido = parseFloat(calcularTotalComTaxa());

    // Se o campo de troco foi preenchido
    if (trocoPara && trocoPara.trim() !== "") {
      valorTroco = parseFloat(
        trocoPara
          .replace("R$", "")
          .replace(/\./g, "")
          .replace(",", ".")
          .trim()
      );

      if (isNaN(valorTroco) || valorTroco < 0) {
        toast.error("Informe um valor válido para troco.");
        return;
      }

      
    if (valorTroco < totalPedido) {
      toast.error("O valor do troco não pode ser menor que o total do pedido.");
      return; // <- impedir a confirmação
    }

      if (valorTroco === 0) {
        // Valor exato
        setTrocoPara("");
        console.log("Pagamento em dinheiro com valor exato.");
      } else if (valorTroco < totalPedido) {
        toast.error("O valor do troco não pode ser menor que o total do pedido.");
        return;
      } else {
        setTrocoPara(valorTroco.toFixed(2));
        console.log("Pagamento em dinheiro, troco para:", valorTroco);
      }
    } else {
      // Campo de troco vazio — assume pagamento exato
      setTrocoPara("");
    }
  }


  setModalAbertoPagamento(false);
  toast.success("Pagamento confirmado!");

  // Espera um pouco antes de limpar

  // Aqui você pode enviar o pedido, incluindo o trocoPara se necessário
  // postPedido(formaPagamento, trocoPara);
}




useEffect(() => {
  if (modalAbertoPagamento) {
    setTrocoPara("");  // reseta o campo para vazio ao abrir
    setFormaPagamento(""); // opcional, se quiser resetar a forma de pagamento ao abrir
  }
}, [modalAbertoPagamento]);


function calcularTroco() {
  // Limpa o valor: remove "R$", pontos e espaços, substitui vírgula por ponto
  const valorPago = parseFloat(
    trocoPara
      .replace(/[^\d,]/g, '')  // remove tudo que não for dígito ou vírgula
      .replace(',', '.')       // substitui vírgula por ponto
  );

  const totalPedido = parseFloat(calcularTotalComTaxa());

  if (isNaN(valorPago)) {
    toast.error("Valor inválido para cálculo.");
    return;
  }

  const troco = valorPago - totalPedido;

  if (troco < 0) {
    toast.error("O valor pago é menor que o total do pedido.");
    return;
  }

  toast.success(`Troco calculado: R$ ${troco.toFixed(2).replace('.', ',')}`);
}








function formatarValorReverso(valorDigitado) {
  // Remove tudo que não for número
  let apenasNumeros = valorDigitado.replace(/\D/g, "");

  // Garante no mínimo 3 dígitos (ex: 000)
  while (apenasNumeros.length < 3) {
    apenasNumeros = "0" + apenasNumeros;
  }

  // Limita a 11 dígitos para evitar estouro de número grande (R$ 99.999.999,99)
  if (apenasNumeros.length > 11) {
    apenasNumeros = apenasNumeros.slice(0, 11);
  }

  const parteReais = apenasNumeros.slice(0, -2);
  const parteCentavos = apenasNumeros.slice(-2);

  // Adiciona ponto de milhar
  const reaisFormatado = parseInt(parteReais, 10).toLocaleString("pt-BR");

  return `R$ ${reaisFormatado},${parteCentavos}`;
}










async function postPedido() {
  
  try {
    const tipoPedido = entregaTipo;
    const tipoPagamento = formaPagamento;


    if (!entregaTipo) {
  toast.error("Selecione se deseja Delivery ou Retirada antes de continuar.");
  return;
}
    if (entregaTipo === "ENTREGA") {

      if (!nomeCliente.trim() || !telefoneCliente.trim() || !enderecoCliente.trim() || !numeroCasaCliente.trim() ||   !bairroCliente?.nome?.trim() ) {
        toast.error("Preencha todos os dados do Delivery antes de continuar.");
        return;
      }

        if(!tipoPagamento) {
      toast.error(" Selecione o tipo de pagamento");
      return;
    }

    }

  if (entregaTipo === "RETIRADA") {

    if (!nomeCliente.trim() || !telefoneCliente.trim()) {
      toast.error("Preencha os dados da Retirada antes de continuar.");
      return;
    }

    
    if(!tipoPagamento) {
      toast.error(" Selecione o tipo de pagamento");
      return;
    }

  }


    if (!["BALCAO", "RETIRADA", "ENTREGA"].includes(tipoPedido)) {
      console.error("Tipo de pedido inválido:", tipoPedido);
      return;
    }



    const idCliente = await cadastrarCliente();

  
    const totalCarrinho = parseFloat(calcularCarrinho());

    // Incluindo sabor principal + adicionais para formar descrição das pizzas
    const saboresPedido = carrinho
      .map(item => {
        const todosSabores = [item.produto, ...(item.sabores || [])];
        const totalSabores = todosSabores.length;

        return todosSabores
          // caso 'sabor' seja objeto, pega 'name', senão string direta
          .map(sabor => `1/${totalSabores} ${sabor.name ?? sabor}`)
          .join(", ");
      })
      .join(", ");

    const pedido = {
      id_usuario: null,
      id_produto: carrinho[0].produto.id, // manter para compatibilidade
      id_cliente: idCliente,
      total: totalCarrinho,
      status: "PENDENTE",
      quantidade: carrinho.reduce((soma, item) => soma + item.quantidade, 0),
      taxaEntrega: bairroCliente?.taxa_entrega || 0,  // <- aqui,
      endereco: enderecoCliente,
      tipoPedido,
      descricaoPedidos: "", // pega a descrição certa,
      sabores: saboresPedido, // agora correto para todas as pizzas
      formaPagamento, // <-- inclui aqui
      troco: formaPagamento === "DINHEIRO" ? parseFloat(trocoPara.replace(",", ".")) : 0,
    };

    const response = await api.post(`/pedidos?comercioId=${comercio.id}`, pedido);
    const pedidoCriado = response.data;
    const pedidoId = pedidoCriado.id;

    for (const item of carrinho) {
      const todosSabores = [item.produto, ...(item.sabores || [])];
      const totalSabores = todosSabores.length;

      // Verifique o que exatamente tem item.produto e item.sabores:
        //console.log("Produto:", item.produto);
        //console.log("Sabores adicionais:", item.sabores);

      const saboresString = todosSabores
        .map(sabor => `1/${totalSabores} ${sabor.name ?? sabor}`)
        .join(", ");
        //console.log("Sabores string:", saboresString);


      const itemData = {
        id_pedidos: pedidoId,
        id_produto: item.produto.id,
        quantidade: item.quantidade,
        preco: item.produto.preco,
        total: item.total,
        comercioId: comercio.id,
        sabores: saboresString,
    descricao: descricaoPedidos[item.produto.id] || "", // ← AQUI É O SEGREDO

      };

     const response = await api.post("/itemPedidos", itemData);
      console.log(response.data)
    }

    

    alert("Pedido feito com sucessos!");
                            // Limpar todos os campos
                          setNomeCliente("");
                          setTelefoneCliente("");
                          setCep("");
                          setCidade("");
                          setEnderecoCliente("");
                          setNumeroCasaCliente("");
                          setComplementoCliente("");
                          setBairroCliente("");
                          setNaoSeiCep(false); // Reseta para mostrar o campo de CEP novamente
                          setFormaPagamento("");
                          setTrocoPara("");
                          setModalCarrinhoAberto(false)
                          setEntregaTipo("");         // Zera tipo de entrega (ENTREGA / RETIRADA)
                          setDescricaoPedidos("");    // Limpa observação/descrição
                          setCarrinho([]);            // 🧹 LIMPA CARRINHO
                          setModalCarrinhoAberto(false); // ❌ FECHA O MODAL DO CARRINHO
                          setObservacaoRetirada("")



  } catch (error) {
    console.error("Erro ao cadastrar pedido:", error.response?.data || error.message);
  }
}




async function cadastrarCliente() {
  try {
    
    const dados = {
      nome: nomeCliente,
      telefone: telefoneCliente,
      endereco: enderecoCliente,
      numero: numeroCasaCliente,
      bairro: bairroCliente?.nome?.trim() || "",
      complemento: complementoCliente,
      email: observacaoRetirada,
      cidade: cidade,
    };

    const response = await api.post(`/clientes?comercioId=${comercio.id}`, dados);
    return response.data.id; // Retorna o ID do cliente

    
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error.response?.data || error.message);
    return;
  }

  
}


useEffect(() => {
  let intervalo;

  async function CarregarPedidos() {
    try {
      const response = await api.get('/pedidoCliente', {
        params: {
          comercioId: comercio.id,
          id_cliente: idCliente,
        },
      });

      console.log("Pedidos recebidos:", response.data);
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  }

  // Carrega imediatamente ao montar
  CarregarPedidos();

  // Recarrega a cada 5 segundos
  intervalo = setInterval(CarregarPedidos, 5000);

  // Limpa o intervalo ao desmontar o componente
  return () => clearInterval(intervalo);

}, [comercio.id, idCliente]);




  // funcao para listar os motoboys 
  useEffect( () => {
 async function listarMotoboys() {

    try {
      const response = await api.get('/motoboys'
      );
      setListarMotoboy(response.data)
    } catch (error) {
      console.error("ERRO AO LISTAR MOTOBYS", error);
    }
    
}
listarMotoboys()

},[comercio.id])


  return (
    <>
    

      {/* HEADER */}
      <header className="w-full h-[60px] flex items-center justify-between gap-4 p-4 bg-red-600">

 <div className="relative">
    <button className="cursor-pointer" onClick={() => setAberto(true)}>
      <Menu size={28} color="#ffffff" />
    </button>

    {pedidos.filter(p => p.status !== 'FINALIZADO' && p.status !== 'CANCELADO').length > 0 && (
<span className="absolute -top-1 -right-2 bg-white text-red-600 border border-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-bounce">
        {pedidos.filter(p => p.status !== 'FINALIZADO' && p.status !== 'CANCELADO').length}
      </span>
    )}
  </div>

 {aberto && (
  <div className="fixed inset-0 bg-red-700 text-white z-50 p-6 animate-slide-fade-left flex flex-col items-center justify-center text-center ">

    {/* Botão Fechar */}
    <button
      onClick={() => setAberto(false)}
      className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
      aria-label="Fechar"
    >
      <X size={26} />
    </button>

    <h2 className="text-3xl font-bold uppercase mb-6 tracking-widest">
      Informações
    </h2>

    <img
      src={comercio.banner}
      width={120}
      height={120}
      className="rounded-full mb-6 shadow-lg hover:scale-110 transition-transform duration-700 object-cover"
      alt={`Logo do comércio ${comercio.nome || ''}`}
    />

    <ul className="space-y-6 text-lg font-medium max-w-md">




     {/* Botão de Pedidos */}
<li>
  <div className="relative inline-block">
    <button
      className="bg-white text-red-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition text-base"
      onClick={() => setModalAbertoPedidos(true)}
    >
      Ver Pedidos
    </button>

    {/* Badge */}
    {pedidos.filter(p => p.status !== "FINALIZADO" && p.status !== "CANCELADO").length > 0 && (
      <span className="absolute -top-2 -right-2 bg-white text-red-600 text-lg font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-red-600 animate-bounce">
        {
          pedidos.filter(p => p.status !== "FINALIZADO" && p.status !== "CANCELADO").length
        }
      </span>
    )}
  </div>
</li>


      {/* Botão Ver Horários */}
      <li>
        <strong className="block mb-1">🕒 Horários:</strong>
        <button
          onClick={() => setShowModalHorarios(true)}
          className="bg-white text-red-700 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          Ver horários
        </button>
      </li>

      {/* WhatsApp */}
      <li>
        <strong className="block mb-1">📞 Contato via WhatsApp:</strong>
        <a
          href={`https://wa.me/${comercio.telefone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-200"
        >
          <img src="/WhatsApp-icone.png" alt="WhatsApp" className="w-6 h-6" />
          {comercio.telefone}
        </a>
      </li>

     <li>
  <strong className="block mb-1">📍 Endereço:</strong>
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(comercio.enderecoComercio + ', ' + comercio.cidade + ', ' + comercio.estado)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/90 no-underline"
  >
    {comercio.enderecoComercio}<br />
    Centro – {comercio.cidade}, {comercio.estado}
  </a>
</li>

    </ul>
  </div>
)}



{/* Modal de horários */}
{showModalHorarios && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800 w-full max-w-md relative">

      <button
        onClick={() => setShowModalHorarios(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        aria-label="Fechar horários"
      >
        <X size={24} />
      </button>

      <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
        ⏰ Horários de Funcionamento
      </h3>

      <div className="divide-y divide-gray-200">
        {[
          { dia: 'Segunda-feira', horario: 'Fechado', fechado: true },
          { dia: 'Terça-feira', horario: 'Fechado', fechado: true },
          { dia: 'Quarta-feira', horario: '18:00 às 23:00' },
          { dia: 'Quinta-feira', horario: '18:00 às 23:00' },
          { dia: 'Sexta-feira', horario: '18:00 às 23:00' },
          { dia: 'Sábado', horario: '18:00 às 23:00' },
          { dia: 'Domingo', horario: '18:00 às 23:00' },
        ].map(({ dia, horario, fechado }, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 text-base"
          >
            <span className="font-medium">{dia}</span>
            <span className={fechado ? "text-red-600 font-semibold" : "text-green-700 font-semibold"}>
              {horario}
            </span>
          </div>
        ))}
      </div>

    </div>
  </div>
)}




{modalAbertoPedidos && (
    <div className= "fixed inset-0 bg-white flex flex-col items-center pt-10 z-50 pb-28 overflow-auto" >

       {/* Fechar */}
      <button
        onClick={() => setModalAbertoPedidos(false)}
        className=" py-2 px-2 fixed left-6 top-6 text-center font-semibold text-white rounded-full bg-red-600 hover:bg-red-700 transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5 text-white" />

      </button>
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Status dos seus Pedidos</h2>

   

    {/* Lista de pedidos em andamento */}
    {pedidos.filter(p => p.status !== 'FINALIZADO' && p.status !== "CANCELADO").length === 0 ? (
      <p className="text-center text-gray-500 mt-10">Nenhum pedido em andamento.</p>
    ) : (
      <ul className="w-full max-w-2xl px-4 space-y-4">
        {pedidos
          .filter(pedido => pedido.status !== 'FINALIZADO' && pedido.status !== "CANCELADO")
          .map((pedido, index) => {
            let statusColor = 'text-yellow-600'
            let IconeStatus = Clock
            let iconFontAwesome = null

            let statusDisplay = pedido.status
            if (pedido.status === 'ENTREGA') statusDisplay = 'O SEU PEDIDO SAIU PARA ENTREGA'
            if (pedido.status === 'PREPARO') statusDisplay = 'O SEU PEDIDO ESTÁ EM PREPARO'
            if (pedido.status === 'PENDENTE') statusDisplay = 'O SEU PEDIDO ESTÁ PENDENTE'
            if (pedido.status === 'ACEITO') statusDisplay = 'O SEU PEDIDO FOI ACEITO'
            if (pedido.status === 'PRONTO') statusDisplay = 'O SEU PEDIDO JÁ FOI FINALIZADO PODE RETIRAR'




            switch (pedido.status) {
              case 'PENDENTE':
                statusColor = 'text-yellow-600'
                IconeStatus = Clock
                break
              case 'ACEITO':
                statusColor = 'text-green-600'
                IconeStatus = CheckCircle
                break

                  case 'PRONTO':
                statusColor = 'text-green-700'
                IconeStatus = CheckCircle
                break

              case 'PREPARO':
                statusColor = 'text-purple-600'
                IconeStatus = Loader
                break
              case 'ENTREGA':
                statusColor = 'text-cyan-600'
                IconeStatus = FontAwesomeIcon
                iconFontAwesome = faMotorcycle
                break
              case 'CANCELADO':
                statusColor = 'text-red-600'
                IconeStatus = XCircle
                break
              default:
                statusColor = 'text-gray-600'
                IconeStatus = Clock
            }

            return (
           <li key={pedido.id} className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
  <div className="flex items-center justify-between mb-2">
    <span className="font-semibold text-gray-700">Pedido #0{index + 1}</span>
    <div className="flex items-center gap-2">
      {iconFontAwesome ? (
        <IconeStatus icon={iconFontAwesome} className={`w-5 h-5 ${statusColor}`} />
      ) : (
        <IconeStatus className={`w-5 h-5 ${statusColor}`} />
      )}
      <span className={`font-bold ${statusColor}`}>{statusDisplay}</span>
    </div>
  </div>

  <div className="text-gray-600 space-y-1 text-sm">
    <p><strong>Tipo:</strong> {pedido.tipoPedido}</p>
    <p><strong>Nome do cliente:</strong> {pedido.cliente?.nome}</p>
    <p><strong>Pedido:</strong> {pedido.sabores}</p>
    <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
    <p><strong>Pagamento:</strong> {pedido.formaPagamento}</p>
    

    {pedido.motoboy && (
  <p className="text-gray-600">
    <strong>Motorista:</strong> {pedido.motoboy.nome}
  </p>
)}

  
  </div>

  {/* Resumo do Pedido */}
  <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm text-sm text-gray-800 space-y-2">
    <h3 className="text-base font-semibold text-gray-900">Resumo do Pedido</h3>

    <div className="flex justify-between">
      <span>Subtotal</span>
      <span className="font-medium">R$ {pedido.total.toFixed(2)}</span>
    </div>

    {pedido.tipoPedido === "ENTREGA" && (
      <div className="flex justify-between">
        <span>Taxa de entrega</span>
        <span className="font-medium">R$ {pedido.taxaEntrega.toFixed(2)}</span>
      </div>
    )}

    {pedido.formaPagamento === "DINHEIRO" &&   pedido.troco > 0 && (
      <div className="flex justify-between">
        <span>🪙 Troco para</span>
        <span className="font-medium">R$ {pedido.troco.toFixed(2)}</span>
      </div>
    )}

    <div className="border-t pt-3 mt-3 flex justify-between items-center">
      <span className="text-base font-semibold text-gray-900">Total a pagar</span>
      <span className="text-xl font-bold text-red-600">
        R$ {(pedido.total + (pedido.taxaEntrega || 0)).toFixed(2)}
      </span>
    </div>
  </div>
</li>

            )
        })}
      </ul>
    )}

    {/* Botões fixos na parte inferior */}
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex z-50 ">
   

      {/* Ver Finalizados */}
      <button
        onClick={() => setMostrarFinalizados(prev => !prev)}
        className="w-full py-6 flex items-center justify-center gap-2 text-center font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
      >
        <ArchiveIcon className="w-5 h-5 text-gray-600" />
        {mostrarFinalizados ? 'Ocultar Finalizados' : 'Ver Pedidos Finalizados'}
      </button>
    </div>
  </div>
)}



















{mostrarFinalizados && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
    <div className="relative w-full h-full flex flex-col bg-white overflow-y-auto p-6 sm:p-10">

      {/* Botão de Voltar */}
      <button
        onClick={() => setMostrarFinalizados(false)}
        className=" py-2 px-2 fixed left-6 top-6 text-center font-semibold text-white rounded-full bg-red-600 hover:bg-red-700 transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5 text-white" />

      </button>

      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mt-10 mb-8">
        Pedidos Finalizados e Cancelados
      </h2>

      {/* FINALIZADOS */}
      <section className="mb-10 max-w-5xl mx-auto w-full">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2 justify-center">
          ✅ Finalizados
        </h3>

        {pedidos.filter(p => p.status === 'FINALIZADO').length === 0 ? (
          <p className="text-base text-gray-500 flex justify-center">Nenhum pedido finalizado.</p>
        ) : (
          <ul className="space-y-4">
            {pedidos
              .filter(p => p.status === 'FINALIZADO')
              .map((pedido, index) => {
                const aberto = pedidoAbertoId === pedido.id;
                const isRetirada = pedido.tipoPedido === "RETIRADA";

                return (
                  <li
                    key={pedido.id}
                    className="bg-green-50 border border-green-200 p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-green-800">Pedido #0{index + 1}</span>
                        <p className="text-green-800">
                        <strong>Data do pedido:</strong> {new Date(pedido.dataPedido).toLocaleDateString()}
                        <span className="ml-4">
                          <strong>Horário:</strong> {new Date(pedido.dataPedido).toLocaleTimeString()}
                        </span>
                      </p>


                  
                    </div>

                    <button
                      onClick={() =>
                        setPedidoAbertoId(aberto ? null : pedido.id)
                      }
                      className="text-sm text-green-600 hover:underline"
                    >
                      {aberto ? 'Ocultar detalhes' : 'Ver detalhes'}
                    </button>

                    {aberto && (
                      <div className="mt-4 space-y-1 text-sm text-gray-700">
                        <p><strong>Nome:</strong> {pedido.cliente?.nome || 'Não informado'}</p>
                        <p><strong>Telefone:</strong> {pedido.cliente?.telefone || 'Não informado'}</p>

                              <div className="flex justify-between text-sm text-gray-800">
                                <p>
                                  <strong>Produtos:</strong> {pedido.sabores}
                                </p>
                                <p>
                                  <strong className="uppercase">Quantidade: {pedido.quantidade}</strong>
                                </p>
                              </div>

                        <p><strong>Forma de pagamento:</strong> {pedido.formaPagamento}</p>
                        <p><strong>Tipo do pedido:</strong> {pedido.tipoPedido}</p>

                        {!isRetirada && (
                          <>
                            <p><strong>Endereço:</strong> {pedido.cliente?.endereco || 'Não informado'}</p>
                            <p><strong>Número:</strong> {pedido.cliente?.numero || 'Não informado'}</p>
                            <p><strong>Bairro:</strong> {pedido.cliente?.bairro || 'Não informado'}</p>
                            <p><strong>Taxa de entrega:</strong> R$ {(pedido.taxaEntrega).toFixed(2) || 'Não informado'}</p>

                          </>
                        )}

                        <p ><strong>Data do pedido:</strong> {new Date(pedido.dataPedido).toLocaleString()}</p>
                        <div className="flex justify-between">
                        <span className="text-xl text-green-700 font-semibold">
                        Total: R$ {pedido.total.toFixed(2)}
                      </span>
                                          {pedido.troco != null && (
                      <span className="text-xl text-green-700 font-semibold">
                        Troco para: R$ {Number(pedido.troco).toFixed(2)}
                      </span>
                    )}

                        </div>
                      

                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        )}
      </section>

      {/* CANCELADOS */}
      <section className="mb-10 max-w-5xl mx-auto w-full">
        <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2 justify-center">
          ❌ Cancelados
        </h3>

        {pedidos.filter(p => p.status === 'CANCELADO').length === 0 ? (
          <p className="text-base text-gray-500 flex justify-center">Nenhum pedido cancelado.</p>
        ) : (
          <ul className="space-y-4">
            {pedidos
              .filter(p => p.status === 'CANCELADO')
              .map((pedido, index) => {
                const aberto = pedidoAbertoId === pedido.id;
                const isRetirada = pedido.tipoPedido === "RETIRADA";

                return (
                  <li
                    key={pedido.id}
                    className="bg-red-50 border border-red-200 p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-red-800">Pedido #{index + 1}</span>
                       <p className="text-red-800">
                        <strong>Data do pedido:</strong> {new Date(pedido.dataPedido).toLocaleDateString()}
                        <span className="ml-4">
                          <strong>Horário:</strong> {new Date(pedido.dataPedido).toLocaleTimeString()}
                        </span>
                      </p>
                    
                    </div>

                    <button
                      onClick={() =>
                        setPedidoAbertoId(aberto ? null : pedido.id)
                      }
                      className="text-sm text-red-600 hover:underline"
                    >
                      {aberto ? 'Ocultar detalhes' : 'Ver detalhes'}
                    </button>

                    {aberto && (
                      <div className="mt-4 space-y-1 text-sm text-gray-700">
                        <p><strong>Nome:</strong> {pedido.cliente?.nome || 'Não informado'}</p>
                        <p><strong>Telefone:</strong> {pedido.cliente?.telefone || 'Não informado'}</p>
                        <p><strong>Sabores:</strong> {pedido.sabores}</p>
                        <p><strong>Forma de pagamento:</strong> {pedido.formaPagamento}</p>
                        <p><strong>Tipo do pedido:</strong> {pedido.tipoPedido}</p>
                         <div className="flex justify-between">
                        <span className="text-xl text-green-700 font-semibold">
                        Total: R$ {pedido.total.toFixed(2)}
                      </span>
                     {pedido.troco != null && (
  <span className="text-xl text-green-700 font-semibold">
    Troco para: R$ {Number(pedido.troco).toFixed(2)}
  </span>
)}

                        </div>
                      

                         

                        {!isRetirada && (
                          <>
                            <p><strong>Endereço:</strong> {pedido.cliente?.endereco || 'Não informado'}</p>
                            <p><strong>Número:</strong> {pedido.cliente?.numero || 'Não informado'}</p>
                            <p><strong>Bairro:</strong> {pedido.cliente?.bairro || 'Não informado'}</p>
                          </>
                        )}

                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        )}
      </section>

    </div>
  </div>
)}


        <button>
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </header>

      {/* CAPA */}
      <section className="w-full h-[500px] p-4 bg-capa bg-cover bg-center relative flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 flex flex-col items-center text-white text-center gap-4">
          <img
            src={comercio.banner}
            width={120}
            height={120}
            className="rounded-full mt-4 hover:scale-110 transition-transform duration-700"
            alt="Logo Miguelito"
          />
          <h1 className="font-poppins font-semibold uppercase text-4xl tracking-widest">
            Miguelito Pizzaria
          </h1>
          <p className="font-poppins text-lg font-light">
            Rua São João Batista, 190 {comercio.cidade}-{comercio.estado}
          </p>
          <button className="flex items-center gap-2 bg-green-600 px-8 uppercase py-2 rounded-lg font-medium tracking-widest text-white shadow-lg hover:bg-green-700 transition-colors duration-300" onClick={() => setShowModalHorarios(true)}>
            <Clock size={18} className="text-white uppercase" />
            Aberto
          </button>
          <div className="text-base font-poppins font-light">
           {comercio.tempoRetirada}-{comercio.tempoEntrega} ● Taxa Mínima R$ {comercio.taxaEntrega} ● Ver mais
          </div>
        </div>
      </section>

      {/* NAV COM SCROLL DAS CATEGORIAS */}
      <section className="w-full bg-red-700 h-[60px] px-4 flex items-center justify-evenly">
        {showEsquerda ? (
          <button
            onClick={scrollLeft}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <ChevronLeft size={30} className="text-white" />
          </button>
        ) : (
          <div className="w-[44px]" />
        )}

        <div className="overflow-hidden max-w-[1000px]">
          <nav
            ref={navRef}
            className="flex items-center gap-6 text-white text-base font-poppins font-medium overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {categorias.map((categoria) => (
              <span
                key={categoria.id}
                onClick={() =>
                  setCategoriaAberta(
                    categoriaAberta === categoria.id ? null : categoria.id
                  )
                }
                className={`cursor-pointer border-b-4 capitalize ${
                  categoriaAberta === categoria.id
                    ? "border-white pb-3 text-gray-50 "
                    : "border-transparent hover:border-white hover:pb-3 hover:text-gray-50"
                } transition-all duration-500 ease-in-out whitespace-nowrap`}
              >
                {categoria.name}
              </span>
            ))}
          </nav>
        </div>

        {showDireita ? (
          <button
            onClick={scrollRight}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <ChevronRight size={30} className="text-white" />
          </button>
        ) : (
          <div className="w-[44px]" />
        )}
      </section>

      {/* SEÇÕES DINÂMICAS DE CATEGORIAS E PRODUTOS */}
      <section className="w-full bg-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {categorias.map((categoria) => {
            const produtosDaCategoria = produtos.filter(
              (produto) => produto.categoria?.id === categoria.id && produto.ativo
            );
            const estaAberta = categoriaAberta === categoria.id;

            return (
              <div
                key={categoria.id}
                className="bg-white rounded-md shadow-md border border-gray-300"
              >
                {/* Cabeçalho clicável */}
                <div
                  onClick={() =>
                    setCategoriaAberta(estaAberta ? null : categoria.id)
                  }
                  className="flex justify-between items-center cursor-pointer px-6 py-4 text-red-700 font-semibold border-b-2 border-red-600"
                >
                  <span className="uppercase font-poppins text-lg tracking-wide">
                    {categoria.name}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      estaAberta ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Produtos listados se aberta */}
                {estaAberta && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {produtosDaCategoria.length === 0 && (
                      <p className="text-gray-500">
                        Nenhum produto nessa categoria.
                      </p>
                    )}
                    {produtosDaCategoria.map((produto) => (
                      <div
                        key={produto.id}
                        className="rounded-xl border border-gray-200 p-4 hover:shadow-lg transition cursor-pointer flex flex-row items-center gap-4"
                      onClick={() => {
  setProdutoSelecionado(produto);
  setQuantidade(1)
  setModalAberto(true);
}}
>
                        <div className="w-[130px] h-[130px] rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={produto.banner}
                            alt={`Banner do produto ${produto.name}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <p className="text-[#36454F] font-semibold text-2xl mb-1">
                            {produto.name}
                          </p>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-4">
                            {produto.descricao}
                          </p>
                          <p className="text-red-700 font-bold text-base flex text-center justify-between">
                            R$ {produto.preco}
                       <span style={{ color: produto.ativo ? "green" : "red" }}>
  {produto.ativo ? "✔ Ativo" : "✖ Inativo"}
</span>
                          </p>
   

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>













{modalAberto && produtoSelecionado && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={() => setModalAberto(false)}
  >
    <div
      className="bg-white rounded-lg p-6 w-[40%] h-[95%] shadow-xl relative overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Topo com botão e imagem */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <button
          className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition self-start"
          onClick={() => setModalAberto(false)}
        >
          <ArrowLeft color="white" size={20} />
        </button>

        <img
          src={produtoSelecionado.banner}
          alt={produtoSelecionado.name}
          className="w-full h-[40vh] object-cover rounded-md"
        />
      </div>

      <div className="w-full mx-auto flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold mb-4 uppercase text-gray-700">
          {produtoSelecionado.name}
        </h2>
        <p className="mb-2 text-gray-700">{produtoSelecionado.descricao}</p>
      </div>

      {/* Botão abrir modal de sabores */}
      <div className="w-full mt-6">
        <div
          className={`w-full h-44 border-2 border-red-400 flex flex-col items-center justify-center text-center rounded-md cursor-pointer mb-4
            ${saboresSelecionados.length === 2 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => {
            if (saboresSelecionados.length < 2) {
              setModalSaboresAberto(true);
            }
          }}
          title={
            saboresSelecionados.length === 2
              ? "Máximo de 2 sabores selecionados"
              : "Adicionar até 2 sabores"
          }
        >
          <PlusCircle className="text-red-600 hover:scale-125 transition-transform duration-300" size={60} />
          <p className="text-sm mt-1">Adicionar até 2 sabores</p>
        </div>




<textarea
  id={`descricao-${produtoSelecionado.id}`}
  rows={4}
  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
  placeholder="Digite alguma observação aqui..."
  value={descricaoPedidos[produtoSelecionado.id] || ""}
  onChange={(e) => {
    setDescricaoPedidos({
      ...descricaoPedidos,
      [produtoSelecionado.id]: e.target.value,
    });
  }}
/>



        {/* Sabores selecionados - só se houver adicionais */}
        {saboresSelecionados.length > 0 && (
          <div className="w-full flex flex-col gap-4">
            <h3 className="text-center text-lg font-semibold uppercase text-gray-700">
              Sabores selecionados ({1 + saboresSelecionados.length}/3)
            </h3>

            <div className="grid grid-cols-1 sm:flex flex-col gap-4">
              {(() => {
                const total = 1 + saboresSelecionados.length;
                const fracao = total === 2 ? "1/2" : total === 3 ? "1/3" : "";

                return (
                  <>
                    {/* Produto principal */}
                    <div
                      className="flex items-center gap-4 border border-gray-200 rounded-md p-3 bg-gray-50 cursor-not-allowed"
                      title="Sabor principal"
                    >
                      <img
                        src={produtoSelecionado.banner}
                        alt={produtoSelecionado.name}
                        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex flex-col flex-grow">
                        <h4 className="text-base font-bold text-gray-800">
                          {fracao} {produtoSelecionado.name}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{produtoSelecionado.descricao}</p>
                      </div>
                      <div className="w-6 h-6 rounded-sm bg-green-600 flex items-center justify-center">
                        <Check size={24} color="white" />
                      </div>
                    </div>

                    {saboresSelecionados.map((sabor) => (
                      <div
                        key={sabor.id}
                        className="flex items-center gap-4 border border-gray-200 rounded-md p-3 cursor-pointer hover:shadow-md transition"
                        onClick={() => toggleSabor(sabor)}
                        title="Clique para remover sabor"
                      >
                        <img
                          src={sabor.banner}
                          alt={sabor.name}
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex flex-col flex-grow">
                          <h4 className="text-base font-bold text-gray-800">
                            {fracao} {sabor.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{sabor.descricao}</p>
                        </div>

                        {/* Div única para Check + Edit */}
                        <div className="flex items-center gap-2">
                          <Pencil
                            size={22}
                            className="cursor-pointer text-gray-700 hover:text-gray-400"
                            onClick={(e) => {
                              e.stopPropagation(); // evitar disparar o toggleSabor no pai
                              setModalSaboresAberto(true); // ou qualquer ação para editar
                            }}
                            title="Editar sabor"
                          />

                          <div className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
                            <Trash2 size={22} color="red" />
                          </div>

                          <div className="w-6 h-6 rounded-sm bg-green-600 flex items-center justify-center cursor-not-allowed">
                            <Check size={24} color="white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Preço e quantidade */}
      <div className="flex items-center gap-4 mt-2 justify-between">
        <p className="text-red-700 font-bold text-2xl">
          R$ {calcularTotal(saboresSelecionados)}
        </p>

        <div className="bg-black text-white rounded-full px-4 py-2 flex items-center justify-between w-28 gap-2 mb-3">
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
              quantidade === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              if (quantidade > 1) setQuantidade((prev) => prev - 1);
            }}
          >
            <Minus size={16} />
          </button>

          <span className="font-bold">{quantidade}</span>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition"
            onClick={() => {
              setQuantidade((prev) => prev + 1);
            }}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Botão adicionar ao carrinho */}
      <button
        className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 mt-4 rounded-lg w-full flex items-center justify-center gap-2 transition-all duration-300"
        onClick={() => adicionarAoCarrinho(produtoSelecionado, saboresSelecionados, quantidade)}
      >
        <ShoppingBag size={20} />
        ADICIONAR
      </button>
    </div>
  </div>
)}









{modalSaboresAberto && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      className="bg-white rounded-lg p-6 w-[40%] max-w-3xl h-[95%] shadow-lg overflow-auto relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Botão Fechar */}
      <button
        className="absolute top-4 left-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition"
        onClick={() => setModalSaboresAberto(false)}
        aria-label="Fechar modal"
      >
        <ArrowLeft size={20} />
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center uppercase">Adicione até 2 sabores</h2>

      {/* Input busca */}
      <input
        type="text"
        placeholder="Buscar produto..."
        className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-red-500 transition"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />

      {/* Produto selecionado principal */}
      <div
        className="flex items-center gap-4 border rounded-md p-3 bg-gray-100 opacity-50 cursor-not-allowed border-green-600 mb-3"
      >
        <img
          src={produtoSelecionado.banner}
          alt={produtoSelecionado.name}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold">{produtoSelecionado.name}</h3>
          <p className="line-clamp-3 text-gray-600 text-sm leading-relaxed">
            {produtoSelecionado.descricao}
          </p>
          <p className="text-red-600 font-bold mt-1">R$ {produtoSelecionado.preco}</p>
        </div>
        <div className="w-6 h-6 rounded-sm bg-green-600 flex items-center justify-center">
          <Check size={24} color="white" />
        </div>
      </div>

      {/* Produtos filtrados */}
      <div className="flex flex-col gap-4 max-h-[calc(80vh-160px)] overflow-y-auto pr-2">
        {produtos
          .filter(
            (prod) =>
              prod.ativo &&
              prod.id !== produtoSelecionado.id &&
              prod.name.toLowerCase().includes(termoBusca.toLowerCase())
          )
          .length === 0 ? (
          <p className="text-center text-gray-500 mt-10 uppercase">
            Nenhum produto encontrado para {termoBusca}.
          </p>
        ) : (
          produtos
            .filter(
              (prod) =>
                prod.ativo &&
                prod.id !== produtoSelecionado.id &&
                prod.name.toLowerCase().includes(termoBusca.toLowerCase())
            )
            .map((produto) => {
              const selecionado = rascunhoSabores.some((s) => s.id === produto.id);
              const limiteAtingido = rascunhoSabores.length >= 2;

              return (
                <div
                  key={produto.id}
                  className={`flex items-center gap-4 border rounded-md p-3 transition
                  ${
                    selecionado
                      ? "border-green-600 cursor-pointer opacity-50"
                      : "border-gray-200 hover:shadow-md cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!limiteAtingido || selecionado) {
                      const novo = selecionado
                        ? rascunhoSabores.filter((s) => s.id !== produto.id)
                        : [...rascunhoSabores, produto];
                      setRascunhoSabores(novo);
                    }
                  }}
                  title={limiteAtingido && !selecionado ? "Máximo de 2 sabores selecionados" : ""}
                >
                  <img
                    src={produto.banner}
                    alt={produto.name}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold">{produto.name}</h3>
                    <p className="line-clamp-3 text-gray-600 text-sm leading-relaxed">
                      {produto.descricao}
                    </p>
                    <p className="text-red-600 font-bold mt-1">R$ {produto.preco}</p>
                  </div>
                  {selecionado && (
                    <div className="w-6 h-6 rounded-sm bg-green-600 flex items-center justify-center">
                      <Check size={24} color="white" />
                    </div>
                  )}
                </div>
              );
            })
        )}
      </div>

      {/* Rodapé com botões */}
      <div className="flex justify-between gap-4 mt-6">
        <button
          className="w-full border border-gray-400 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          onClick={() => {
            setModalSaboresAberto(false); // fecha sem salvar
          }}
        >
          CANCELAR
        </button>
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          onClick={() => {
            setSaboresSelecionados(rascunhoSabores); // salva
            setModalSaboresAberto(false);
          }}
        >
          CONFIRMAR
        </button>
      </div>
    </div>
  </div>
)}

{produtoSelecionado && carrinho.length > 0 &&(
  <footer className="fixed bottom-0 left-0 w-full z-10 bg-red-600 shadow-xl">
    <button
      className="w-full flex items-center justify-center gap-2 text-white font-semibold text-base py-4 hover:bg-red-700 transition-all duration-200"
      onClick={() => setModalCarrinhoAberto(true)}
    >
      <ShoppingCart className="w-5 h-5" />
      <span>Ver carrinho ({carrinho.length})</span>
    </button>
  </footer>
)}














{modalCarrinhoAberto && (

  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    onClick={() => setModalCarrinhoAberto(false)}
  >
    <div
      className="bg-white flex flex-col w-full h-full rounded-none shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Cabeçalho */}
      <header className="flex items-center justify-between p-6 border-b border-gray-300 sticky top-0 bg-white z-20 shadow-sm">
        <button
          onClick={() => setModalCarrinhoAberto(false)}
          className="absolute top-6 left-6 text-red-600 hover:text-red-800 transition-transform hover:scale-125 duration-1000"
          aria-label="Voltar"
        >
          <X size={48} />
        </button>
        <h2 className="text-4xl font-extrabold text-gray-900 text-center flex-grow">Meu Carrinho</h2>
        <div style={{ width: 72 }}></div>
      </header>

      {/* Conteúdo do carrinho */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50">
        {carrinho.length === 0 ? (
          <p className="text-gray-500 text-center text-xl font-medium">Carrinho vazio</p>
        ) : (
          carrinho.map((item) => {
            const totalSabores = 1 + item.sabores.length;

            return (
              <div
                key={item.id}
                className="flex items-center gap-8 bg-white rounded-lg shadow-md p-6"
              >
                <img
                  src={item.produto.banner}
                  alt={item.produto.name}
                  className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1 flex justify-between items-center">
                      {totalSabores > 1 ? "Pizza Grande" : item.produto.name}
                      <Trash2
                        size={28}
                        className="text-red-600 transition-transform cursor-pointer hover:scale-125 duration-500"
                        onClick={() => removerItemDoCarrinho(item.id)}
                      />
                    </h3>
                    <div className="mt-1 text-base text-gray-600 italic flex flex-col gap-1">
                      <span>{`1/${totalSabores} ${item.produto.name}`}</span>
                      {item.sabores.map((sabor) => (
                        <span key={sabor.id}>{`1/${totalSabores} ${sabor.name}`}</span>
                      ))}
                    </div>
{descricaoPedidos[item.produto.id] && (
  <div className="mt-2 flex gap-2">
    <p className="font-semibold text-gray-700">Observação do produto:</p>
    <p className="text-gray-800">{descricaoPedidos[item.produto.id]}</p>
  </div>
)}



                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg text-gray-700 font-medium">
                      Quantidade: <span className="font-bold">{item.quantidade}</span>
                    </p>
                    <p className="font-extrabold text-red-600 text-2xl">
                      R${calcularPrecoItem(item).toFixed(2)}
                    </p>
                  </div>
                  
                </div>
              </div>
            );
          })
        )}

        <>
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-6">
            Como deseja receber o produto?
          </h2>

          <div className="flex justify-center gap-4 w-full px-6">
           <button
  className={`w-[47vw] py-20 rounded-lg font-semibold transition
    ${
      opcaoSelecionada === "ENTREGA"
        ? "bg-white border border-gray-300 shadow-md text-gray-900"
        : "bg-gray-100 border border-transparent text-gray-600"
    }`}
  onClick={() => {
    abrirDelivery();
    setOpcaoSelecionada("ENTREGA");
  }}
>
  Delivery
</button>

<button
  className={`w-[47vw] py-20 rounded-lg font-semibold transition
    ${
      opcaoSelecionada === "RETIRADA"
        ? "bg-white border border-gray-300 shadow-md text-gray-900"
        : "bg-gray-100 border border-transparent text-gray-600"
    }`}
  onClick={() => {
    abrirRetirar();
    setOpcaoSelecionada("RETIRADA");
  }}
>
  Retirar
</button>

             
          </div>


   {/* Seção: Forma de Pagamento */}
<section className="mt-10 px-6">
  <h2 className="text-lg font-semibold text-gray-800 text-center mb-6">
    Por favor, selecione a forma de pagamento desejada
  </h2>

  <div className="flex justify-center">
    <button
      onClick={() => {
        setModalAbertoPagamento(true);
        setOpcaoSelecionada("PAGAMENTO");
      }}
      className={`w-full max-w-7xl py-20 rounded-xl font-semibold text-xl transition-transform
        ${
          opcaoSelecionada === "PAGAMENTO"
            ? "bg-white border border-gray-300 shadow-md text-gray-900"
            : "bg-gray-100 border border-transparent text-gray-600"
        }`}
    >
      Formas de Pagamento
    </button>
  </div>
</section>





          {modalAbertoDelivery && entregaTipo === "ENTREGA" && (
            <div
              className="fixed inset-0 z-50 flex items-start justify-center bg-white overflow-y-auto "
              onClick={() => setModalAbertoDelivery(false)}
            >
              <div
                className="w-full min-h-screen p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-6 text-6xl text-red-600 font-bold hover:scale-110 transition"
                  onClick={() => setModalAbertoDelivery(false)}
                  aria-label="Fechar modal"
                >
                  &times;
                </button>

                <div className="max-w-2xl mx-auto pt-14 pb-24">
                  <h3 className="mb-8 text-2xl font-semibold text-center text-gray-800">
                    Qual o local de entrega?
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    if (!cep && !naoSeiCep) {
                        toast.error("Informe o CEP ou clique em 'Não sei o CEP'", {
                          style: {
                            backgroundColor: "#d62626",
                            color: "#fff",
                          },
                        });
                        return;
                      }
                      setModalAbertoDelivery(false);
                      toast.success("Seu Cadastro para o delivery foi realizado com sucesso",{
                        style:{
                          backgroundColor:"green",
                          color:"#fff",
                        }
                      });
                        
                    }}
                    className="space-y-6"
                  >










                    <div>
                      <label className="font-medium text-gray-700 block mb-1">Qual seu nome?</label>
                      <input
                        type="text"
                        placeholder="Digite seu nome"
                        className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="font-medium text-gray-700 block mb-1">Qual seu Whatsapp?</label>
                      <input
                        type="text"
                        placeholder="(XX) XXXXX-XXXX"
                        className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
                        value={telefoneCliente}
                        onChange={(e) => setTelefoneCliente(e.target.value)}
                        required
                      />
                    </div>

                    {!naoSeiCep && (
                      <div>
                        <label className="font-medium text-gray-700 block mb-1">CEP</label>
                        <input
                          type="text"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          placeholder="12970-000"
                          className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setNaoSeiCep(true);
                            setCep("");
                            setCidade("");
                          }}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium"
                        >
                          Não sei o CEP
                        </button>
                      </div>
                    )}

                    {(cep || naoSeiCep) && (
                      <>
                        <div>
                          <label className="font-medium text-gray-700 block mb-1">Rua/Av.</label>
                          <input
                            type="text"
                            className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
                            value={enderecoCliente}
                            onChange={(e) => setEnderecoCliente(e.target.value)}
                            required
                            placeholder="Digite o nome da sua rua ou AV"
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-1">Número</label>
                          <input
                            type="text"
                            className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
                            value={numeroCasaCliente}
                            onChange={(e) => setNumeroCasaCliente(e.target.value)}
                            required
                            placeholder="Digite o número da sua residencia.."
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-1">Complemento</label>
                          <input
                            type="text"
                            className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
                            value={complementoCliente}
                            onChange={(e) => setComplementoCliente(e.target.value)}
                              placeholder="Exemplo: Apartamento 202, Bloco B, Perto do Lago etc.."
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-1">Cidade</label>
                          <input
                            type="text"
                            value={cidade}
                            readOnly={!naoSeiCep}
                            onChange={(e) => setCidade(e.target.value)}
                            className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm bg-white"
                            required
                            placeholder="Digite a Cidade que você reside..."
                          />
                        </div>

                    <Combobox value={bairroCliente} onChange={setBairroCliente}>
  <div className="relative">
    <Combobox.Input 
      className="w-full p-5 text-sm border uppercase font-semibold border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Digite para buscar o bairro..."
      onChange={(event) => setQuery(event.target.value)}
      displayValue={(bairro) => 
        bairro ? `${bairro.nome} - R$ ${bairro.taxa_entrega.toFixed(2)}` : ""
      }
    />

    <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
      {bairrosFiltrados.length === 0 ? (
        <div className="px-4 py-2 text-gray-500">Nenhum bairro encontrado</div>
      ) : (
        bairrosFiltrados.map((bairro) => (
          <Combobox.Option
            key={bairro.id}
            value={bairro}
            className={({ active }) =>
              `px-4 py-2 cursor-pointer ${
                active ? "bg-blue-500 text-white" : "text-gray-900"
              }`
            }
          >
            <div className="flex justify-between items-center">
              <span>{bairro.nome}</span>
              <span className="text-sm font-medium">
                R${bairro.taxa_entrega.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  </div>
</Combobox>


                        <div>
                          <label className="font-medium text-gray-700 block mb-1">
                            Favoritar endereço como
                          </label>
                          <input
                            type="text"
                            placeholder="Minha Casa"
                            className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
                          />
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-4 text-lg rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Confirmar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      </main>














    <footer className="p-6 border-t border-gray-300 bg-white sticky bottom-0 flex flex-col gap-4 shadow-lg">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
    <div className="text-sm sm:text-base text-gray-800 font-medium space-y-1">
     <p>
  <strong>🛍️ Entrega:</strong> {entregaTipo === "ENTREGA" ? "Delivery" : entregaTipo ? "Retirada" : "—"}
</p>

{entregaTipo === "ENTREGA" && bairroCliente?.taxa_entrega !== undefined && (
  <p>
    <strong>📦 Taxa de entrega:</strong> R$ {Number(bairroCliente.taxa_entrega).toFixed(2).replace(".", ",")}
  </p>
)}


      <p>
        <strong>💳 Pagamento: </strong> {formaPagamento || "—"} 
{formaPagamento === "DINHEIRO" && trocoPara && (
  <strong>

    <span className="uppercase">
        — Troco Para: R${" "}
      {parseFloat(
        trocoPara.toString().replace("R$", "").replace(",", ".")
      )
        .toFixed(2)
        .replace(".", ",")}
    </span>
  </strong>
)}

      </p>
    </div>

    <span className="text-2xl font-extrabold text-gray-900">
      Total: R${calcularTotalComTaxa()}
    </span>
  </div>

  <button
    onClick={postPedido}
    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-lg transition-colors shadow-md"
  >
    Continuar Compra
  </button>
</footer>


    </div>
  </div>
)}











{modalAbertoRetirada && entregaTipo === "RETIRADA" && (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center bg-white overflow-y-auto"
    onClick={() => setModalAbertoRetirada(false)}
  >
    <div
      className="w-full h-full max-h-screen p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-4 right-6 text-6xl text-red-600 font-bold hover:scale-110 transition"
        onClick={() => setModalAbertoRetirada(false)}
        aria-label="Fechar modal"
      >
        &times;
      </button>

      <div className="max-w-2xl mx-auto pt-14 pb-24">
        <h3 className="mb-8 text-2xl font-semibold text-center text-gray-800">
          Informações para retirada
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            cadastrarCliente();
              setModalAbertoRetirada(false); // Fecha o modal após confirmar
                toast.success("Seu Cadastro para a Retirada foi realizado com sucesso",{
                        style:{
                          backgroundColor:"green",
                          color:"#fff",
                        }
                      });
          }}
          className="space-y-6"
        >
          <div>
            <label className="font-medium text-gray-700 block mb-1">Qual seu nome?</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 block mb-1">Qual seu Whatsapp?</label>
            <input
              type="text"
              placeholder="(XX) XXXXX-XXXX"
              className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
              value={telefoneCliente}
              onChange={(e) => setTelefoneCliente(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 block mb-1">
              Deseja deixar alguma observação?
            </label>
            <input
              type="text"
              placeholder="Ex: Retirar às 19h"
              className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm"
              value={observacaoRetirada}
              onChange={(e) => setObservacaoRetirada(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 text-lg rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Confirmar Retirada
          </button>
        </form>
      </div>
    </div>
  </div>
)}



{modalAbertoPagamento && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => setModalAbertoPagamento(false)}
  >
    <div
      className="bg-white rounded-lg shadow-2xl w-[90%] max-w-4xl p-8 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Botão de fechar */}
           <button
                  className="absolute top-6 left-6 text-6xl text-red-600 font-bold hover:scale-110 transition"
                  onClick={() => setModalAbertoPagamento(false)}
                  aria-label="Fechar modal">  
                <ArrowLeft  className="w-9 h-9" />
                
                </button>

      {/* Título */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Qual a forma de pagamento?
      </h2>

      {/* Opções */}
      <div className="space-y-4">
        {["DINHEIRO", "CREDITO", "DEBITO", "PIX"].map((tipo) => (
          <label
            key={tipo}
            className={`flex flex-col gap-2 p-4 border rounded-lg cursor-pointer transition ${
              formaPagamento === tipo ? "border-green-500 bg-green-50" : "border-gray-300"
            }`}
            onClick={() => setFormaPagamento(tipo)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  formaPagamento === tipo ? "bg-green-500 border-green-500" : "border-gray-400"
                }`}
              >
                {formaPagamento === tipo && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {tipo === "DINHEIRO" && "Dinheiro"}
                  {tipo === "CREDITO" && "Crédito"}
                  {tipo === "DEBITO" && "Débito"}
                  {tipo === "PIX" && (
                    <span className="flex items-center gap-2">
                     <img
  src="/pix.png"
  alt="Pix"
  className="w-28 h-11"

/>

                      
                    </span>
                  )}
                </p>
                {(tipo === "CREDITO" || tipo === "DEBITO") && (
                  <p className="text-sm text-gray-500">Levamos a máquina do cartão</p>
                )}
              </div>
            </div>

            {/* Input de troco visível apenas se tipo === DINHEIRO */}
           {tipo === "DINHEIRO" && formaPagamento === "DINHEIRO" && (
  <div className="mt-4 space-y-2">
    <label className="block text-sm font-semibold text-gray-800 mb-1">
      TROCO PARA ?
    </label>
   <input
  type="text"
  inputMode="numeric" // importante para celulares mostrarem só número
  value={trocoPara}
  onChange={(e) => {
    const formatado = formatarValorReverso(e.target.value);
    setTrocoPara(formatado);
  }}
  className="w-full border border-gray-300 rounded-sm p-2 text-gray-800"
  placeholder="R$ 0,00"
/>

    <button
      className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-sm transition"
      onClick={calcularTroco}
       // se quiser, substitua por outra função
    >
      Calcular Troco
    </button>

    <button
      className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-sm transition"
      onClick={handleConfirmarPagamento}
    >
      Confirmar
    </button>
  </div>
)}

          </label>
        ))}
      </div>

      {/* Botão Confirmar */}
      <button
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition"
        onClick={handleConfirmarPagamento}
      >
        Confirmar
      </button>
    </div>
  </div>
)}

    </>
  );
}
