/* Interações locais. Sem bibliotecas, rastreamento ou conexão externa. */
const steps = [
  ['Tudo começa com uma boa pergunta.', 'O que a administração precisa contratar? Organize a necessidade, o contexto e as informações essenciais antes de começar a documentação.', 'Clareza sobre a necessidade pública.', '◎'],
  ['Uma estrutura para avançar com clareza.', 'A proposta é orientar a elaboração do Estudo Técnico Preliminar e do Termo de Referência, organizando requisitos, justificativas e seções essenciais.', 'ETP e TR com informações estruturadas.', '▤'],
  ['Referências que sustentam a estimativa.', 'Reúna fontes de preços e compare características, unidades e condições dos itens. O objetivo é apoiar estimativas mais fundamentadas e transparentes.', 'Referências comparáveis e evidências organizadas.', '⌁'],
  ['Atenção ao que pode passar despercebido.', 'Verificações propostas de completude, consistência e requisitos previamente definidos ajudam a apontar possíveis omissões e contradições.', 'Identificação antecipada de pontos de atenção.', '⊙'],
  ['Cada pendência, um próximo passo.', 'Visualize os pontos que exigem correção, complementação ou validação, com orientações e referências para apoiar a revisão.', 'Uma visão consolidada do que precisa de revisão.', '≡'],
  ['Revisar, validar e seguir em frente.', 'Após as correções e validações dos profissionais responsáveis, os documentos podem ser encaminhados às etapas administrativas pertinentes.', 'Documentos revisados para o encaminhamento.', '✓']
];
const tabs = [...document.querySelectorAll('[data-step]')];
function selectStep(index, focus = false) {
  const data = steps[index];
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  document.getElementById('step-panel').setAttribute('aria-labelledby', tabs[index].id);
  document.getElementById('step-kicker').textContent = `ETAPA ${String(index + 1).padStart(2, '0')} / 06`;
  document.getElementById('step-title').textContent = data[0];
  document.getElementById('step-description').textContent = data[1];
  document.getElementById('step-focus').textContent = data[2];
  document.getElementById('step-symbol').textContent = data[3];
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectStep(i));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (i + 1) % tabs.length;
    if (event.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectStep(next, true); }
  });
});
selectStep(0);
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('motion-ready');
}
