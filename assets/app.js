const STORAGE_KEY = "beSafeN2ProgressV1";

const course = [
  {
    id: "cap1",
    title: "Capítulo 1 — O papel real do SOC N2",
    badge: "Triagem avançada",
    theory: [
      "N2 não é N1 com ego e café mais forte. N2 valida severidade, reconstrói linha do tempo, identifica escopo e decide se escala para RI, MSS, Cloud, IAM ou Infra.",
      "Objetivo técnico: reduzir falso positivo sem matar incidente real. A regra é simples: evidência antes de opinião, contexto antes de grito, hipótese antes de conclusão.",
      "Entradas típicas: alerta SIEM, EDR, NDR, WAF, IAM, CSPM, ticket, usuário desesperado, gestor querendo print e aquela planilha que ninguém atualiza.",
      "Saídas esperadas: timeline, ativos afetados, usuários envolvidos, evidências, hipótese mais provável, impacto, contenção sugerida e critérios de escalonamento.",
      "Erros clássicos: fechar por reputação isolada, ignorar processo pai, não verificar lateralidade, não comparar baseline, não preservar evidência e chamar tudo de APT porque apareceu PowerShell."
    ],
    lab: {
      title: "Lab 1 — Alerta múltiplo: PowerShell, login impossível e EDR nervoso",
      intro: "Você recebeu três alertas do mesmo host em 9 minutos. O objetivo é montar uma hipótese, priorizar evidência e definir se escala.",
      logs: [
        "[SIEM] 2026-06-17 09:12:44 user=ana.silva src_ip=189.44.10.8 dst=o365 action=success geo=BR",
        "[SIEM] 2026-06-17 09:15:03 user=ana.silva src_ip=91.214.124.77 dst=vpn action=fail geo=RU reason=mfa_denied",
        "[EDR] 2026-06-17 09:16:22 host=FIN-044 proc=WINWORD.EXE child=powershell.exe cmd='-nop -w hidden -enc SQBFAFgA...'",
        "[EDR] 2026-06-17 09:16:31 host=FIN-044 net=powershell.exe -> hxxps://cdn-updates-check[.]com/a.png",
        "[AD] 2026-06-17 09:17:10 user=ana.silva event=4624 logon_type=3 src=FIN-044 dst=FS-02",
        "[EDR] 2026-06-17 09:18:02 host=FIN-044 file=C:\\Users\\ana\\AppData\\Roaming\\update_service.exe sha256=8f3..."
      ],
      tasks: [
        "Identificar o pivô inicial mais provável.",
        "Separar evidência forte de ruído.",
        "Indicar duas ações de contenção proporcionais.",
        "Definir se o caso é incidente ou suspeita em validação."
      ],
      answer: "Pivô provável: documento Word executando PowerShell ofuscado. Login VPN da Rússia com MFA negado é contexto de possível credential stuffing, mas não prova comprometimento. Evidências fortes: processo pai WINWORD.EXE, PowerShell encoded, conexão externa e dropper update_service.exe. Contenção: isolar FIN-044 no EDR, bloquear IOC temporariamente, revogar sessões/tokens de ana.silva e coletar artefatos antes de apagar tudo igual faxina de estagiário apavorado."
    },
    questions: [
      {
        q: "Um alerta de PowerShell codificado foi gerado a partir do WINWORD.EXE em uma máquina financeira, e no mesmo intervalo houve uma tentativa de VPN negada por MFA a partir de país incomum para a usuária. Todas as opções abaixo têm algum valor operacional. Qual conduta é a mais correta para N2?",
        options: [
          "Encerrar como tentativa bloqueada, pois o MFA negado comprova que o invasor não conseguiu entrar.",
          "Isolar imediatamente o host, preservar evidências, validar processo pai, linha de comando, conexões, arquivos criados e sessões da identidade afetada.",
          "Resetar a senha da usuária e fechar o chamado, porque o problema principal é identidade.",
          "Abrir incidente crítico sem validação adicional, pois qualquer PowerShell codificado é ransomware confirmado."
        ],
        correct: 1,
        why: "A resposta mais correta combina contenção proporcional com preservação e validação multissinal. O MFA negado é contexto, não sentença absolutória."
      },
      {
        q: "Durante a triagem N2, qual evidência tem maior força para sustentar exploração via documento malicioso, considerando que todas podem aparecer no caso?",
        options: [
          "Usuário relatou que o computador ficou lento depois de abrir e-mail.",
          "WINWORD.EXE criou powershell.exe com parâmetro encoded command e conexão externa subsequente.",
          "O domínio externo tem reputação desconhecida em uma base pública.",
          "O host pertence ao departamento financeiro e por isso é sensível."
        ],
        correct: 1,
        why: "Processo pai, linha de comando e conexão de rede formam cadeia técnica muito mais forte que reputação isolada ou percepção do usuário."
      },
      {
        q: "O gestor pede uma conclusão rápida para apresentar em reunião. Qual frase de N2 é mais tecnicamente responsável?",
        options: [
          "Foi APT com certeza, porque usou PowerShell e domínio estranho.",
          "Foi falso positivo, porque o antivírus não bloqueou nada.",
          "Há indícios consistentes de execução suspeita originada por documento; escopo e impacto ainda estão em validação com coleta de endpoint, identidade e rede.",
          "Não dá para saber nada até a perícia completa, então o SOC não deve tomar ação."
        ],
        correct: 2,
        why: "Comunica hipótese, evidência e incerteza sem inventar novela cyber."
      },
      {
        q: "Qual é o melhor critério para escalar do N2 para resposta a incidentes?",
        options: [
          "Qualquer alerta com severidade alta do SIEM, sem necessidade de contexto.",
          "Confirmação ou forte suspeita de execução maliciosa, persistência, movimentação lateral, impacto, exfiltração ou comprometimento de conta privilegiada.",
          "A quantidade de dashboards abertos pelo analista durante a triagem.",
          "A existência de um IOC no VirusTotal, mesmo sem relação com o ambiente."
        ],
        correct: 1,
        why: "Escalonamento deve considerar comportamento, impacto e risco real no ambiente."
      },
      {
        q: "Qual erro mais prejudica uma investigação N2 em seus primeiros minutos?",
        options: [
          "Coletar eventos de SIEM, EDR e IAM antes de fechar conclusão.",
          "Registrar incertezas e hipóteses concorrentes.",
          "Apagar artefatos e limpar quarentena antes de preservar evidência, porque 'resolve mais rápido'.",
          "Verificar se existem eventos parecidos em outros hosts."
        ],
        correct: 2,
        why: "Apagar evidência antes de coleta destrói contexto, dificulta escopo e transforma investigação em arqueologia triste."
      }
    ]
  },
  {
    id: "cap2",
    title: "Capítulo 2 — SIEM, correlação e timeline sem fanfic",
    badge: "SIEM & logs",
    theory: [
      "SIEM não investiga sozinho. Ele agrega, normaliza e correlaciona. Quem entende o que o campo significa ainda é o analista, pelo menos até a IA parar de confundir service account com invasor russo.",
      "N2 deve entender fonte, latência, normalização, timestamp, timezone, cardinalidade, deduplicação, enrichment e perda de evento.",
      "Timeline boa responde: quem, o quê, quando, onde, como e com qual evidência. Se não responde, é colagem de log bonita.",
      "Correlação forte cruza identidade, endpoint, rede e aplicação. Correlação fraca junta coisas pelo mesmo IP NATado e chama de campanha.",
      "Sempre verifique: janela temporal, hostnames inconsistentes, IP reaproveitado por DHCP, usuário de serviço, asset crítico, horário comercial e baseline."
    ],
    lab: {
      title: "Lab 2 — Montando timeline com campos conflitantes",
      intro: "Os logs têm timezone misturado, NAT e hostname duplicado. A missão é criar uma timeline confiável.",
      logs: [
        "[VPN UTC] 2026-06-17T12:03:11Z user=joao.lima action=success src=201.55.7.10 public_ip=true",
        "[EDR -0300] 2026-06-17 09:05:42 host=DEV-009 user=joao.lima proc=cmd.exe child=whoami.exe",
        "[AD -0300] 2026-06-17 09:06:10 event=4672 user=joao.lima privilege=SeDebugPrivilege host=DEV-009",
        "[DHCP -0300] 2026-06-17 08:59:01 ip=10.10.4.91 host=DEV-009 mac=AA:19",
        "[DHCP -0300] 2026-06-17 09:20:44 ip=10.10.4.91 host=NOTE-331 mac=BB:20",
        "[Proxy UTC] 2026-06-17T12:07:02Z user=joao.lima url=hxxp://paste-sync[.]top/put bytes_out=804221"
      ],
      tasks: [
        "Converter horários para a mesma referência.",
        "Separar evidência de DEV-009 e NOTE-331.",
        "Identificar risco de atribuição errada por DHCP.",
        "Criar ordem provável dos eventos."
      ],
      answer: "A timeline em -0300 fica: 09:03:11 VPN success, 09:05:42 cmd/whoami em DEV-009, 09:06:10 privilégio especial em DEV-009, 09:07:02 upload para paste-sync. DHCP mostra que 10.10.4.91 era DEV-009 até 09:20:44; depois mudou para NOTE-331. Não atribuir eventos pós-09:20 ao DEV-009 sem validar MAC/EDR."
    },
    questions: [
      {
        q: "Você percebe que parte dos logs está em UTC e parte em horário local -0300. Qual prática é mais correta antes de concluir a sequência do ataque?",
        options: [
          "Ordenar pela ordem em que o SIEM exibiu os eventos, pois a plataforma já sabe tudo.",
          "Normalizar timestamps para uma referência única, registrar fonte/timezone e considerar latência de ingestão.",
          "Ignorar eventos de VPN porque estão em UTC e complicam a análise.",
          "Converter apenas os eventos que confirmam a hipótese principal."
        ],
        correct: 1,
        why: "Sem normalização temporal, a timeline vira horóscopo com JSON."
      },
      {
        q: "Qual cuidado reduz mais o risco de atribuir ação ao host errado em rede com DHCP?",
        options: [
          "Assumir que IP interno sempre representa o mesmo ativo durante o dia.",
          "Cruzar IP, horário, lease DHCP, MAC, hostname e telemetria de endpoint.",
          "Usar apenas o campo src_ip do firewall.",
          "Priorizar o nome do usuário, ignorando o dispositivo."
        ],
        correct: 1,
        why: "DHCP muda posse de IP. Correlação correta exige tempo, MAC e fonte complementar."
      },
      {
        q: "Uma regra correlaciona login VPN, whoami e upload externo em cinco minutos. Qual validação N2 é mais relevante?",
        options: [
          "Confirmar se o usuário existe no AD.",
          "Verificar se os eventos pertencem ao mesmo usuário, mesmo host, janela coerente e se o upload é anômalo para o perfil.",
          "Checar se o domínio externo tem nome feio.",
          "Ver se o alerta ficou vermelho no dashboard."
        ],
        correct: 1,
        why: "A força da correlação está na coerência entre entidades, tempo e comportamento."
      },
      {
        q: "Qual campo costuma causar interpretação errada em SIEM quando não há entendimento de NAT/proxy?",
        options: [
          "user_agent, porque sempre identifica uma pessoa única.",
          "public_ip compartilhado, porque pode representar muitos usuários atrás da mesma saída.",
          "event_id, porque nunca é confiável.",
          "hostname, porque sempre é falso."
        ],
        correct: 1,
        why: "IP público compartilhado raramente identifica usuário sozinho."
      },
      {
        q: "Qual entrega representa melhor uma timeline N2 madura?",
        options: [
          "Prints de telas organizados em sequência visual.",
          "Lista de logs sem interpretação, porque evidência não precisa contexto.",
          "Sequência temporal normalizada com fonte, entidade, ação, evidência, incertezas e lacunas.",
          "Resumo dizendo 'atividade suspeita detectada' sem detalhes para não assustar."
        ],
        correct: 2,
        why: "Timeline útil mostra fatos, contexto e limites da análise."
      }
    ]
  },
  {
    id: "cap3",
    title: "Capítulo 3 — Endpoint: processo, persistência e coleta",
    badge: "EDR & artefatos",
    theory: [
      "No endpoint, o N2 deve pensar em árvore de processo, comando, usuário, integridade, hash, path, assinatura, conexões, arquivos tocados e persistência.",
      "PowerShell, WMI, rundll32, regsvr32, mshta, certutil e schtasks podem ser legítimos. O problema não é a ferramenta; é o contexto. Binário nativo não ganha santidade só porque veio com Windows.",
      "Persistências comuns: Run Keys, Scheduled Tasks, serviços, WMI Event Subscription, Startup Folder, DLL hijacking, extensão de navegador, launch agents em macOS e crontab/systemd em Linux.",
      "Coleta mínima: process tree, command line, autoruns, conexões, DNS cache, arquivos recentes, usuário logado, eventos de segurança, triagem de memória quando aplicável.",
      "Cuidado: contenção não é formatação. Formatar antes de entender escopo é como queimar o livro porque achou uma vírgula suspeita."
    ],
    lab: {
      title: "Lab 3 — Persistência por Scheduled Task e Run Key",
      intro: "O EDR detectou execução suspeita, mas o binário já não está rodando. Verifique persistência e escopo local.",
      logs: [
        "[EDR] host=RH-021 parent=explorer.exe proc=update_service.exe path=C:\\Users\\Public\\Libraries\\update_service.exe",
        "[EDR] host=RH-021 registry_set HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\OneDriveUpdate value=C:\\Users\\Public\\Libraries\\update_service.exe",
        "[Windows] EventID=4698 task=\\Microsoft\\Windows\\WDI\\DiagUpdate action='powershell -w hidden -file C:\\ProgramData\\diag.ps1'",
        "[Sysmon] EventID=3 image=update_service.exe dst=45.77.19.33:443",
        "[Sysmon] EventID=11 file=C:\\ProgramData\\diag.ps1",
        "[EDR] file_deleted=C:\\Users\\Public\\Libraries\\update_service.exe user=rh.assistente"
      ],
      tasks: [
        "Identificar persistências.",
        "Definir evidências que devem ser coletadas.",
        "Indicar contenção segura.",
        "Explicar por que arquivo deletado não encerra caso."
      ],
      answer: "Persistências: Run Key OneDriveUpdate e Scheduled Task DiagUpdate. Coletar chave de registro, XML da tarefa, diag.ps1, eventos 4698/Sysmon, conexões, hash se recuperável, USN Journal/MFT quando disponível e timeline. Isolar host e bloquear destino. Arquivo deletado não encerra caso porque persistência e execução anterior permanecem relevantes."
    },
    questions: [
      {
        q: "Um binário suspeito foi apagado, mas há Run Key apontando para o path antigo e uma Scheduled Task executando script em ProgramData. Qual conclusão é mais correta?",
        options: [
          "Como o binário foi apagado, o incidente acabou.",
          "Há evidência de persistência ou tentativa de persistência e o host deve ser tratado como comprometido até validação.",
          "Run Key é sempre legítima quando menciona OneDrive.",
          "Scheduled Task só é problema se executar como SYSTEM."
        ],
        correct: 1,
        why: "Persistência não depende do malware estar rodando naquele segundo."
      },
      {
        q: "Qual conjunto de artefatos é mais útil para investigar execução e persistência no Windows?",
        options: [
          "Somente hash do arquivo e reputação pública.",
          "Process tree, command line, registry autoruns, scheduled tasks, eventos, conexões, arquivos criados e usuário.",
          "Apenas print do alerta EDR.",
          "Somente lista de programas instalados."
        ],
        correct: 1,
        why: "Investigação endpoint exige cadeia de execução e estado de persistência."
      },
      {
        q: "Por que LOLBins não devem ser tratados automaticamente como benignos?",
        options: [
          "Porque todos são malware por definição.",
          "Porque ferramentas legítimas podem ser abusadas para execução, download, evasão e persistência quando o contexto indica desvio.",
          "Porque antivírus não monitora binários do Windows.",
          "Porque nomes curtos são sempre perigosos."
        ],
        correct: 1,
        why: "O abuso de binários legítimos é técnica comum; contexto manda."
      },
      {
        q: "Qual ação de contenção é mais equilibrada para um host com persistência confirmada e conexão C2 recente?",
        options: [
          "Isolar via EDR, preservar evidências, bloquear IOCs e avaliar credenciais usadas no host.",
          "Reinstalar o sistema imediatamente sem coleta.",
          "Apenas avisar o usuário para reiniciar.",
          "Remover o alerta do painel para não gerar ruído."
        ],
        correct: 0,
        why: "Contém, preserva e expande escopo sem destruir evidência."
      },
      {
        q: "Em uma árvore de processo, o que mais aumenta a suspeita de execução por macro maliciosa?",
        options: [
          "EXCEL.EXE abrindo um arquivo .xlsx local.",
          "WINWORD.EXE criando powershell.exe com comando ofuscado, download externo e escrita em AppData.",
          "Explorer.exe abrindo notepad.exe.",
          "Teams.exe consumindo memória em reunião."
        ],
        correct: 1,
        why: "Office criando shell com download e escrita em perfil é comportamento altamente suspeito."
      }
    ]
  },
  {
    id: "cap4",
    title: "Capítulo 4 — Identidade: AD, Entra ID, MFA e abuso de conta",
    badge: "IAM & AD",
    theory: [
      "Ataque de identidade é o ransomware fazendo aquecimento. N2 precisa ler eventos de logon, MFA, token, consentimento OAuth, alteração de grupo, Kerberos, NTLM e privilégio.",
      "Eventos úteis: 4624, 4625, 4672, 4720, 4728, 4732, 4768, 4769, 4771, 4776, além de logs de Entra ID Sign-in, Audit, Risky Users e Service Principal.",
      "MFA negado não é incidente resolvido; pode indicar senha válida. MFA aprovado por push fatigue é quase uma carta de amor para o invasor.",
      "Service accounts precisam dono, escopo, rotação, restrição de logon e monitoramento. Conta de serviço Domain Admin é aquele tipo de decisão que envelhece como leite no sol.",
      "N2 deve diferenciar: senha vazada, impossible travel, password spray, brute force, token theft, consent phishing, Kerberoasting e abuso de privilégio."
    ],
    lab: {
      title: "Lab 4 — Password spray com um sucesso silencioso",
      intro: "Várias falhas espalhadas e um sucesso em conta sem MFA. O objetivo é detectar padrão e impacto.",
      logs: [
        "[Entra] 08:00 user=marcos result=fail reason=invalid_password ip=185.199.88.10 app=O365",
        "[Entra] 08:00 user=financeiro result=fail reason=invalid_password ip=185.199.88.10 app=O365",
        "[Entra] 08:01 user=svc_backup result=success mfa=not_required ip=185.199.88.10 app=AzurePortal",
        "[Audit] 08:03 actor=svc_backup action=List storage account keys resource=backup-prod",
        "[AD] 08:05 EventID=4672 user=svc_backup host=BK-01 privileges=SeBackupPrivilege",
        "[Entra] 08:06 actor=svc_backup action=Create service principal name=sync-helper"
      ],
      tasks: [
        "Identificar técnica provável.",
        "Explicar por que o sucesso é mais grave que as falhas.",
        "Definir contenção de identidade.",
        "Listar escopo cloud/AD a verificar."
      ],
      answer: "Técnica provável: password spray com sucesso em svc_backup sem MFA. Gravidade: acesso AzurePortal, listagem de chaves de storage e criação de service principal. Contenção: desabilitar/rotacionar svc_backup, revogar sessões/tokens, revisar privilégios, remover service principal suspeito, auditar storage keys, verificar uso de chaves e logons relacionados."
    },
    questions: [
      {
        q: "Em um password spray, por que uma única autenticação bem-sucedida pode ser mais importante que centenas de falhas?",
        options: [
          "Porque falhas sempre são falso positivo.",
          "Porque o sucesso pode indicar credencial válida, ausência de MFA e ponto de entrada para ações pós-comprometimento.",
          "Porque sucesso em conta de serviço nunca é usado por invasores.",
          "Porque o SIEM só deve alertar falhas."
        ],
        correct: 1,
        why: "O sucesso muda o caso de tentativa para possível comprometimento."
      },
      {
        q: "Qual evidência aponta mais fortemente para abuso cloud pós-comprometimento?",
        options: [
          "Falhas de login em usuários comuns.",
          "Conta sem MFA acessando AzurePortal, listando storage keys e criando service principal.",
          "Usuário esqueceu a senha.",
          "Login em horário comercial a partir do escritório."
        ],
        correct: 1,
        why: "Ações administrativas em cloud após login suspeito indicam abuso real."
      },
      {
        q: "Qual contenção de identidade é mais completa para conta comprometida em ambiente Microsoft?",
        options: [
          "Trocar senha e pronto.",
          "Revogar sessões/tokens, resetar credencial, exigir MFA, revisar métodos MFA, remover privilégios indevidos e auditar ações recentes.",
          "Bloquear o IP apenas.",
          "Enviar e-mail educativo para todos."
        ],
        correct: 1,
        why: "Token e métodos MFA podem manter acesso mesmo após senha trocada."
      },
      {
        q: "Qual sinal é mais compatível com Kerberoasting?",
        options: [
          "Muitas solicitações TGS 4769 para SPNs por usuário comum, seguidas de tentativa offline de quebra.",
          "Falha de MFA por geolocalização incomum.",
          "Download de arquivo pelo navegador.",
          "Execução de notepad.exe."
        ],
        correct: 0,
        why: "Kerberoasting envolve solicitação de tickets de serviço para cracking offline."
      },
      {
        q: "Qual prática reduz risco em service accounts?",
        options: [
          "Conceder Domain Admin para evitar chamado.",
          "Aplicar menor privilégio, dono definido, rotação, MFA quando aplicável, restrição de logon e monitoramento.",
          "Usar senha sem expiração e compartilhar no Teams.",
          "Nomear como svc_nao_mexer para ninguém investigar."
        ],
        correct: 1,
        why: "Governança técnica de conta de serviço evita que ela vire elevador VIP do atacante."
      }
    ]
  },
  {
    id: "cap5",
    title: "Capítulo 5 — Rede, DNS, proxy e exfiltração",
    badge: "Network",
    theory: [
      "Rede conta histórias que endpoint tenta esconder. DNS, proxy, NetFlow, firewall e NDR ajudam a ver beaconing, C2, lateralidade e exfiltração.",
      "Beaconing: padrão periódico, baixo volume, domínio novo, JA3/JA4 suspeito, user-agent incomum e destino raro no ambiente.",
      "Exfiltração: bytes out anômalos, compressão, upload para serviços incomuns, DNS tunneling, cloud storage pessoal, HTTP PUT/POST repetido e tráfego fora do perfil.",
      "Movimentação lateral: SMB, RDP, WinRM, WMI, PsExec, admin shares, autenticações entre estações e conexões para servidores sensíveis.",
      "N2 deve comparar baseline. Sem baseline, tudo parece ataque ou tudo parece normal, depende do humor do dashboard."
    ],
    lab: {
      title: "Lab 5 — Exfiltração via cloud storage e lateralidade SMB",
      intro: "Você precisa diferenciar backup legítimo de vazamento triste.",
      logs: [
        "[Proxy] host=ENG-077 user=carlos url=https://drive-sync-personal[.]com/upload method=POST bytes_out=912MB category=Personal Storage",
        "[DNS] host=ENG-077 query=drive-sync-personal[.]com ttl=60 first_seen=2026-06-17",
        "[NetFlow] ENG-077 -> FS-ENG-01 dst_port=445 bytes=2.8GB duration=11m",
        "[AD] carlos logon_type=3 src=ENG-077 dst=FS-ENG-01",
        "[Proxy] ENG-077 user_agent='curl/7.88' bytes_out=912MB",
        "[DLP] policy=source_code severity=high action=monitor user=carlos"
      ],
      tasks: [
        "Identificar sinais de exfiltração.",
        "Separar lateralidade de acesso legítimo.",
        "Definir contenção e escopo.",
        "Listar evidências para preservar."
      ],
      answer: "Sinais fortes: domínio first_seen, categoria Personal Storage, POST com 912MB, curl incomum, DLP source_code, acesso SMB grande ao file server antes do upload. Contenção: isolar host, bloquear destino, preservar proxy/DNS/NetFlow/DLP, verificar arquivos acessados, revisar permissões, acionar jurídico/compliance conforme política."
    },
    questions: [
      {
        q: "Qual combinação de evidências mais fortalece hipótese de exfiltração?",
        options: [
          "Acesso SMB grande a file server, upload externo volumoso para storage pessoal, domínio recém-visto e DLP de código-fonte.",
          "Usuário acessou internet e o proxy registrou bytes.",
          "DNS resolveu um domínio com TTL baixo, isoladamente.",
          "O host é de engenharia e engenharia usa muitos arquivos."
        ],
        correct: 0,
        why: "A cadeia completa mostra coleta interna + saída externa + sensibilidade do dado."
      },
      {
        q: "Por que DNS first_seen é útil, mas não suficiente sozinho?",
        options: [
          "Porque todo domínio novo é malicioso.",
          "Porque indica novidade no ambiente, mas precisa ser correlacionado com comportamento, reputação, volume e entidade.",
          "Porque DNS nunca ajuda investigação.",
          "Porque TTL baixo prova C2."
        ],
        correct: 1,
        why: "Novidade é sinal, não condenação."
      },
      {
        q: "Qual tráfego entre estações merece atenção em movimentação lateral?",
        options: [
          "SMB, RDP, WinRM ou WMI entre endpoints sem padrão operacional esperado.",
          "HTTPS para portal corporativo conhecido.",
          "NTP para servidor interno.",
          "DNS para resolvedor autorizado."
        ],
        correct: 0,
        why: "Protocolos administrativos entre endpoints podem indicar propagação."
      },
      {
        q: "Qual ação inicial é mais adequada quando há suspeita de exfiltração ativa?",
        options: [
          "Desligar todos os firewalls.",
          "Conter host/origem, bloquear destino, preservar logs e identificar dados potencialmente acessados.",
          "Apagar arquivos do servidor para impedir vazamento.",
          "Aguardar uma semana para confirmar tendência."
        ],
        correct: 1,
        why: "Contenção precisa parar saída e preservar material para impacto."
      },
      {
        q: "Qual pergunta de N2 mais melhora a análise de tráfego anômalo?",
        options: [
          "O gráfico ficou bonito?",
          "Esse volume, destino, método, horário e usuário são normais para esse ativo e função?",
          "O domínio tem nome estranho?",
          "O firewall chamou de permitido?"
        ],
        correct: 1,
        why: "Anomalia só existe em relação a um baseline."
      }
    ]
  },
  {
    id: "cap6",
    title: "Capítulo 6 — Cloud, SaaS e logs que cobram por GB",
    badge: "Cloud & SaaS",
    theory: [
      "Cloud muda o perímetro: identidade vira chave, API vira superfície e log vira boleto. SOC N2 precisa entender plano de controle, plano de dados e permissões.",
      "AWS: CloudTrail, GuardDuty, VPC Flow Logs, IAM Access Analyzer, S3 data events. Azure: Entra ID, Activity Logs, Defender for Cloud, Key Vault logs, Storage logs. Google Cloud: Admin Activity, Data Access, VPC Flow.",
      "Ações críticas: criação de access key, alteração de política IAM, desativação de logging, leitura de secrets, snapshot público, security group aberto e criação de usuário/service principal.",
      "SaaS: consentimento OAuth, forwarding rule em e-mail, download massivo, compartilhamento público, token suspeito e app de terceiro com permissão absurda.",
      "N2 deve olhar escopo: conta/tenant, região, recurso, principal, ação, IP, user-agent, sucesso/falha, alteração persistente e possível acesso a dados."
    ],
    lab: {
      title: "Lab 6 — Chave criada, logging alterado e bucket exposto",
      intro: "Um usuário cloud executou ações administrativas fora do padrão.",
      logs: [
        "[CloudTrail] event=CreateAccessKey user=devops.jr source_ip=177.44.2.8 user_agent=aws-cli/2.15",
        "[CloudTrail] event=PutBucketPolicy bucket=finance-reports effect=Allow principal=* action=s3:GetObject",
        "[CloudTrail] event=StopLogging trail=org-main-trail user=devops.jr",
        "[GuardDuty] finding=Policy:S3/BucketAnonymousAccessGranted severity=High",
        "[IAM] user=devops.jr groups=Developers MFA=enabled last_admin_action=never",
        "[S3] bucket=finance-reports data_events=disabled"
      ],
      tasks: [
        "Identificar ações críticas.",
        "Definir contenção cloud.",
        "Determinar lacunas de visibilidade.",
        "Indicar perguntas para o time cloud."
      ],
      answer: "Crítico: CreateAccessKey, bucket policy público, StopLogging e data events desabilitados. Contenção: desativar chave, remover policy pública, reativar logging, revisar permissões de devops.jr, verificar CloudTrail org, habilitar data events no bucket sensível e procurar uso da chave. Perguntas: mudança autorizada? janela de manutenção? IaC? ticket? quais objetos podem ter sido acessados?"
    },
    questions: [
      {
        q: "Qual sequência cloud é mais crítica do ponto de vista N2?",
        options: [
          "Usuário criou access key, tornou bucket público e parou logging da trilha principal.",
          "Usuário consultou documentação e listou regiões disponíveis.",
          "Usuário autenticou com MFA em horário comercial.",
          "Usuário visualizou painel sem alterar recurso."
        ],
        correct: 0,
        why: "Criação de chave + exposição + redução de logging é cadeia de risco alto."
      },
      {
        q: "Por que desabilitar data events de bucket sensível é uma lacuna relevante?",
        options: [
          "Porque impede ver toda autenticação do sistema operacional.",
          "Porque pode impedir visibilidade granular de acesso aos objetos, dificultando avaliação de exposição de dados.",
          "Porque apaga automaticamente todos os arquivos.",
          "Porque transforma S3 em servidor FTP."
        ],
        correct: 1,
        why: "Sem data events, pode faltar evidência de leitura de objetos."
      },
      {
        q: "Qual contenção cloud é mais correta ao suspeitar de abuso de access key?",
        options: [
          "Apagar a conta cloud inteira.",
          "Inativar/rotacionar chave, revisar permissões, procurar uso da chave, preservar logs e reverter mudanças maliciosas.",
          "Mandar mensagem para o usuário perguntando se foi ele e encerrar.",
          "Ignorar se MFA estava ativo."
        ],
        correct: 1,
        why: "Access key não usa MFA a cada chamada; precisa resposta própria."
      },
      {
        q: "Em SaaS de e-mail, qual comportamento é forte indicador de comprometimento?",
        options: [
          "Criação de regra de encaminhamento externo, consentimento OAuth suspeito e login de IP incomum.",
          "Usuário leu e-mail pelo celular cadastrado.",
          "Caixa postal recebeu spam.",
          "Usuário mudou foto de perfil."
        ],
        correct: 0,
        why: "Regras externas e OAuth abusivo são persistência/exfiltração em SaaS."
      },
      {
        q: "Qual pergunta ajuda a diferenciar mudança cloud legítima de ataque?",
        options: [
          "Existe ticket, pipeline/IaC, aprovação, janela de mudança, owner e padrão histórico compatível?",
          "O nome do usuário parece confiável?",
          "O evento aconteceu em cloud, então é normal.",
          "O alerta tem ícone vermelho?"
        ],
        correct: 0,
        why: "Mudança legítima deixa rastro operacional coerente."
      }
    ]
  },
  {
    id: "cap7",
    title: "Capítulo 7 — Malware, ransomware e pré-criptação",
    badge: "Malware & Ransomware",
    theory: [
      "N2 não precisa reverter malware como pesquisador full-time, mas precisa reconhecer comportamento, escopo e urgência. O ransomware não começa na tela pedindo Bitcoin; começa dias antes, passeando no AD igual turista sem educação.",
      "Pré-criptação: discovery, credential access, lateral movement, backup tampering, exfiltração, desativação de EDR, criação de GPO, PsExec/SMB e execução remota.",
      "Sinais: vssadmin delete shadows, wbadmin delete catalog, bcdedit recovery disabled, mass file rename, extensão anômala, spikes SMB, ferramentas como rclone/mega/curl, compactação 7zip.",
      "Prioridade N2: detectar antes da criptografia, preservar evidência, isolar escopo, proteger backup, acionar RI e impedir propagação.",
      "MITRE ATT&CK ajuda a classificar técnica, mas não substitui análise. Mapear TTP não é decorar sigla para parecer LinkedIn Premium."
    ],
    lab: {
      title: "Lab 7 — Ransomware em pré-criptação",
      intro: "Há sinais de preparação antes de impacto. Sua missão é agir antes do boleto do resgate.",
      logs: [
        "[EDR] SRV-FS01 proc=vssadmin.exe cmd='delete shadows /all /quiet' user=adm_temp",
        "[EDR] SRV-FS01 proc=wbadmin.exe cmd='delete catalog -quiet'",
        "[AD] EventID=4728 member=adm_temp group=Domain Admins actor=helpdesk.ana",
        "[NetFlow] SRV-FS01 -> 10.20.8.0/24 dst_port=445 connections=1842",
        "[EDR] SRV-FS01 proc=7z.exe cmd='a -tzip C:\\ProgramData\\finance.zip \\\\FS-FIN\\share\\*'",
        "[Proxy] SRV-FS01 -> hxxps://mega-upload[.]site bytes_out=3.4GB"
      ],
      tasks: [
        "Identificar fase do ataque.",
        "Priorizar contenção.",
        "Proteger backup.",
        "Definir escalonamento."
      ],
      answer: "Fase: pré-criptação com credential abuse, backup tampering, coleta/compactação e exfiltração. Prioridade: isolar SRV-FS01, desabilitar/rotacionar adm_temp e helpdesk.ana, bloquear SMB lateral quando possível, bloquear destino, acionar RI, validar integridade/imutabilidade de backups e preservar logs."
    },
    questions: [
      {
        q: "Qual conjunto de eventos indica maior risco de ransomware iminente?",
        options: [
          "vssadmin delete shadows, inclusão em Domain Admins, conexões SMB massivas, compactação e upload externo.",
          "Usuário abriu navegador e baixou PDF.",
          "Antivírus atualizou assinatura.",
          "Servidor fez backup agendado."
        ],
        correct: 0,
        why: "A cadeia mostra preparação, privilégio, lateralidade, coleta e exfiltração."
      },
      {
        q: "Qual ação deve ser priorizada ao ver exclusão de shadow copies em file server?",
        options: [
          "Esperar criptografar para ter certeza.",
          "Conter host, preservar logs, proteger backup, revisar credenciais privilegiadas e acionar RI.",
          "Fechar como manutenção.",
          "Reiniciar o servidor para limpar memória."
        ],
        correct: 1,
        why: "Excluir shadow copies é comportamento crítico em pré-impacto."
      },
      {
        q: "Por que backup deve entrar no raciocínio N2 em ransomware?",
        options: [
          "Porque invasores frequentemente tentam destruir, criptografar ou invalidar backups antes do impacto.",
          "Porque backup não tem relação com ransomware.",
          "Porque restaurar backup sempre resolve sem investigação.",
          "Porque backup substitui contenção."
        ],
        correct: 0,
        why: "Sem backup íntegro, recuperação vira negociação com criminoso."
      },
      {
        q: "Qual evidência ajuda a diferenciar cópia operacional de exfiltração?",
        options: [
          "Destino externo incomum, volume alto, compressão prévia, usuário/contexto anômalo e ausência de mudança autorizada.",
          "Arquivo grande existe, então é exfiltração.",
          "Qualquer zip é malicioso.",
          "Todo upload HTTPS é seguro."
        ],
        correct: 0,
        why: "Exfiltração é inferida por cadeia contextual."
      },
      {
        q: "Qual frase de escalonamento é mais útil para RI?",
        options: [
          "Tem coisa estranha no servidor, vejam aí.",
          "Há evidência de pré-ransomware: tampering de backup, privilégio indevido, SMB massivo e exfiltração; host isolado e credenciais em contenção.",
          "O SIEM alertou vermelho.",
          "Provavelmente é falso, mas estou mandando."
        ],
        correct: 1,
        why: "Escalonamento bom entrega evidência, fase, ações já tomadas e risco."
      }
    ]
  },
  {
    id: "cap8",
    title: "Capítulo 8 — Comunicação, relatório e handoff sem vergonha",
    badge: "Comunicação técnica",
    theory: [
      "N2 precisa escrever bem. Não precisa romance, precisa precisão. Relatório ruim transforma ataque real em fofoca operacional.",
      "Estrutura: resumo executivo, severidade, impacto, timeline, evidências, escopo, ações realizadas, recomendações, pendências e próximos passos.",
      "Use linguagem proporcional: confirmado, provável, suspeito, não evidenciado, em validação. Essas palavras salvam carreiras e evitam teatro.",
      "Handoff para N3/RI deve conter artefatos, hipóteses, IOCs, contas, hosts, lacunas, preservação e riscos imediatos.",
      "Humor pode existir no treinamento; no relatório executivo, deixe a acidez no café. Cliente quer clareza, não stand-up investigativo."
    ],
    lab: {
      title: "Lab 8 — Handoff para RI",
      intro: "Com base nos achados acumulados, produza um handoff claro.",
      logs: [
        "Host afetado: FIN-044; Usuária: ana.silva; Processo inicial: WINWORD.EXE -> powershell.exe -enc",
        "Persistência: update_service.exe em AppData e Run Key suspeita",
        "Rede: conexão para cdn-updates-check[.]com; upload posterior para paste-sync[.]top",
        "Identidade: MFA negado externo; sessões revogadas; senha resetada",
        "Contenção: host isolado via EDR; IOC bloqueado no proxy; coleta EDR iniciada",
        "Pendências: validar outros hosts com mesmo IOC; confirmar dados acessados; analisar arquivo original"
      ],
      tasks: [
        "Escrever resumo executivo.",
        "Classificar severidade.",
        "Listar ações tomadas.",
        "Listar pendências objetivas."
      ],
      answer: "Resumo: Há evidência de execução suspeita originada por documento Office no host FIN-044, com PowerShell ofuscado, comunicação externa e persistência local. A identidade associada teve tentativa externa de MFA negada. Contenção inicial aplicada: isolamento do host, bloqueio de IOC e revogação de sessões. Severidade alta até validação de escopo e possível exfiltração. Pendências: hunting por IOCs, análise do documento, coleta forense do host, revisão de dados acessados."
    },
    questions: [
      {
        q: "Qual classificação textual é mais adequada quando há fortes indícios, mas escopo ainda não confirmado?",
        options: [
          "Confirmado em todo ambiente.",
          "Suspeita consistente/alta probabilidade, com escopo em validação.",
          "Falso positivo até alguém provar o contrário.",
          "APT internacional sofisticado, porque soa bonito."
        ],
        correct: 1,
        why: "Reflete confiança e limitações sem exagero."
      },
      {
        q: "Qual item não pode faltar em handoff para RI?",
        options: [
          "Hosts, contas, timeline, evidências, IOCs, ações já tomadas, lacunas e risco imediato.",
          "Preferência pessoal do analista sobre a interface do SIEM.",
          "Prints sem horário nem fonte.",
          "Frases genéricas copiadas de relatório antigo."
        ],
        correct: 0,
        why: "RI precisa continuidade operacional, não decoração."
      },
      {
        q: "Qual resumo executivo é mais correto?",
        options: [
          "Houve incidente cibernético grave. Fim.",
          "Identificamos execução suspeita em FIN-044 com PowerShell ofuscado, persistência local e comunicação externa; contenção inicial aplicada e escopo em validação.",
          "O usuário clicou em coisa errada, como sempre.",
          "O ambiente está comprometido inteiro, provavelmente."
        ],
        correct: 1,
        why: "É objetivo, técnico e proporcional."
      },
      {
        q: "Qual diferença entre IOC e TTP é mais correta?",
        options: [
          "IOC é indicador observável como hash/domínio/IP; TTP descreve comportamento/técnica/procedimento do adversário.",
          "IOC e TTP são a mesma coisa.",
          "TTP é sempre mais falso que IOC.",
          "IOC só existe em firewall."
        ],
        correct: 0,
        why: "IOC é observável; TTP é modo de operação."
      },
      {
        q: "Qual recomendação pós-incidente é mais madura?",
        options: [
          "Comprar mais uma ferramenta e pronto.",
          "Corrigir causa raiz, melhorar detecção, revisar privilégio, reforçar MFA, ajustar logging, treinar usuários e testar controles.",
          "Culpar o usuário final no relatório.",
          "Desligar PowerShell de tudo sem avaliar impacto."
        ],
        correct: 1,
        why: "Maturidade vem de causa raiz, controle e melhoria contínua."
      }
    ]
  }
];

let state = {
  student: "",
  quizzes: {},
  labs: {},
  open: "cap1"
};

function loadState(){
  try{ state = {...state, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})}; }catch(e){}
}
function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function todayBR(){
  return new Date().toLocaleDateString("pt-BR");
}
function pct(n,d){ return d ? Math.round((n/d)*100) : 0; }

function isChapterApproved(ch){
  return !!state.labs[ch.id] && !!state.quizzes[ch.id]?.graded && state.quizzes[ch.id].score >= 70;
}

function isChapterUnlocked(idx){
  if(idx === 0) return true;
  return isChapterApproved(course[idx - 1]);
}

function allCourseApproved(){
  return course.every(ch => isChapterApproved(ch));
}

function renderChapters(){
  const wrap = document.getElementById("chapters");
  wrap.innerHTML = "";
  course.forEach((ch, idx) => {
    const unlocked = isChapterUnlocked(idx);
    const labDone = !!state.labs[ch.id];
    const quiz = state.quizzes[ch.id];
    const quizScore = quiz ? quiz.score : null;
    const approved = isChapterApproved(ch);
    const div = document.createElement("article");
    div.className = "chapter " + (state.open === ch.id && unlocked ? "chapter-open" : "locked");
    div.innerHTML = `
      <div class="chapter-head">
        <div>
          <p class="eyebrow">Módulo ${idx + 1}</p>
          <h3>${ch.title}</h3>
          <p><span class="kicker">${ch.badge}</span> • Lab: ${labDone ? "concluído" : "pendente"} • Quiz: ${quizScore === null ? "não feito" : quizScore + "%"} • ${approved ? "aprovado" : unlocked ? "liberado" : "bloqueado"}</p>
          ${!unlocked ? `<p class="feedback">Bloqueado: conclua o capítulo anterior com lab feito e mínimo de 70% no quiz. SOC N2 sem pré-requisito vira bagunça gourmet.</p>` : ""}
        </div>
        <button data-open="${ch.id}" ${!unlocked ? "disabled" : ""}>${!unlocked ? "Bloqueado" : state.open === ch.id ? "Recolher" : "Abrir capítulo"}</button>
      </div>
      <div class="content-grid">
        <div class="theory">
          <h4>Conteúdo técnico</h4>
          <ul>${ch.theory.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>
        <div>
          <div class="lab-box">
            <h4>${ch.lab.title}</h4>
            <p>${ch.lab.intro}</p>
            <div class="lab-terminal">${ch.lab.logs.map(l => `<div>${escapeHtml(l)}</div>`).join("")}</div>
            <h4>Tarefas do lab</h4>
            <ul>${ch.lab.tasks.map(t => `<li>${t}</li>`).join("")}</ul>
            <div class="lab-controls">
              <button data-showlab="${ch.id}">Ver resolução guiada</button>
              <button data-labdone="${ch.id}">${labDone ? "Refazer lab" : "Marcar lab concluído"}</button>
            </div>
            <div id="lab-answer-${ch.id}" class="feedback" style="display:none">${ch.lab.answer}</div>
          </div>
          <div class="quiz-box" id="quiz-${ch.id}">
            ${renderQuiz(ch)}
          </div>
        </div>
      </div>
    `;
    wrap.appendChild(div);
  });
}

function renderQuiz(ch){
  return `
    <h4>Avaliação do capítulo</h4>
    <p>Escolha a alternativa mais correta. Todas têm cheiro de plausível, porque questão fácil não treina N2.</p>
    ${ch.questions.map((item, qi) => `
      <div class="question" data-ch="${ch.id}" data-q="${qi}">
        <p>${qi+1}. ${item.q}</p>
        ${item.options.map((op, oi) => `<button class="option" data-answer="${ch.id}|${qi}|${oi}">${op}</button>`).join("")}
        <div class="feedback" id="fb-${ch.id}-${qi}"></div>
      </div>
    `).join("")}
    <div class="lab-controls">
      <button data-submit="${ch.id}">Corrigir quiz</button>
      <button data-resetquiz="${ch.id}">Refazer questões</button>
    </div>
    <p class="feedback" id="result-${ch.id}"></p>
  `;
}

function bind(){
  document.querySelectorAll("[data-jump]").forEach(btn => btn.onclick = () => document.getElementById(btn.dataset.jump).scrollIntoView());
  document.getElementById("saveStudent").onclick = () => {
    const name = document.getElementById("studentName").value.trim();
    if(!name){ alert("Digite o nome do aluno. SOC sem identidade vira evento órfão."); return; }
    state.student = name;
    saveState();
    updateScore();
  };
  document.querySelectorAll("[data-open]").forEach(btn => btn.onclick = () => {
    const idx = course.findIndex(c => c.id === btn.dataset.open);
    if(!isChapterUnlocked(idx)){
      alert("Capítulo bloqueado. Conclua o anterior com lab feito e mínimo de 70% no quiz.");
      return;
    }
    state.open = state.open === btn.dataset.open ? "" : btn.dataset.open;
    saveState(); renderChapters(); bind(); restoreSelections(); updateScore();
  });
  document.querySelectorAll("[data-showlab]").forEach(btn => btn.onclick = () => {
    const box = document.getElementById("lab-answer-" + btn.dataset.showlab);
    box.style.display = box.style.display === "none" ? "block" : "none";
  });
  document.querySelectorAll("[data-labdone]").forEach(btn => btn.onclick = () => {
    const id = btn.dataset.labdone;
    state.labs[id] = !state.labs[id];
    saveState(); renderChapters(); bind(); restoreSelections(); updateScore();
  });
  document.querySelectorAll("[data-answer]").forEach(btn => btn.onclick = () => {
    const [cid, qi, oi] = btn.dataset.answer.split("|");
    state.quizzes[cid] = state.quizzes[cid] || {answers:{}, score:0};
    state.quizzes[cid].answers[qi] = Number(oi);
    saveState();
    const qbox = btn.closest(".question");
    qbox.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
    btn.classList.add("selected");
  });
  document.querySelectorAll("[data-submit]").forEach(btn => btn.onclick = () => gradeQuiz(btn.dataset.submit));
  document.querySelectorAll("[data-resetquiz]").forEach(btn => btn.onclick = () => resetQuiz(btn.dataset.resetquiz));
  document.getElementById("generateCert").onclick = generateCertificate;
}

function restoreSelections(){
  Object.entries(state.quizzes).forEach(([cid, data]) => {
    if(!data.answers) return;
    Object.entries(data.answers).forEach(([qi, oi]) => {
      const btn = document.querySelector(`[data-answer="${cid}|${qi}|${oi}"]`);
      if(btn) btn.classList.add("selected");
    });
    if(data.graded) showGrade(cid, false);
  });
}

function gradeQuiz(cid){
  const ch = course.find(c => c.id === cid);
  const data = state.quizzes[cid] || {answers:{}};
  if(Object.keys(data.answers || {}).length < ch.questions.length){
    alert("Responda todas. N2 não fecha incidente com metade da evidência, né bebê?");
    return;
  }
  let correct = 0;
  ch.questions.forEach((q, qi) => { if(data.answers[qi] === q.correct) correct++; });
  state.quizzes[cid] = {...data, score:pct(correct, ch.questions.length), graded:true};
  saveState();
  showGrade(cid, true);
  const idx = course.findIndex(c => c.id === cid);
  if(isChapterApproved(course[idx]) && course[idx + 1]){
    state.open = course[idx + 1].id;
    saveState();
    renderChapters(); bind(); restoreSelections();
  }
  updateScore();
}

function showGrade(cid){
  const ch = course.find(c => c.id === cid);
  const data = state.quizzes[cid];
  if(!data) return;
  ch.questions.forEach((q, qi) => {
    const selected = data.answers?.[qi];
    const fb = document.getElementById(`fb-${cid}-${qi}`);
    const qbox = document.querySelector(`.question[data-ch="${cid}"][data-q="${qi}"]`);
    if(!qbox) return;
    qbox.querySelectorAll(".option").forEach((btn, oi) => {
      btn.classList.remove("correct","wrong");
      if(oi === q.correct) btn.classList.add("correct");
      if(oi === selected && oi !== q.correct) btn.classList.add("wrong");
    });
    if(fb) fb.textContent = q.why;
  });
  const result = document.getElementById("result-" + cid);
  if(result) result.textContent = `Resultado: ${data.score}%. ${data.score >= 70 ? "Aprovado no capítulo. O dashboard respirou aliviado." : "Refaça. O SOC N2 exige mais que fé e refresh no SIEM."}`;
}

function resetQuiz(cid){
  delete state.quizzes[cid];
  saveState();
  renderChapters(); bind(); restoreSelections(); updateScore();
}

function updateScore(){
  const total = course.length;
  const labDone = Object.values(state.labs).filter(Boolean).length;
  const graded = course.filter(c => state.quizzes[c.id]?.graded);
  const avg = graded.length ? Math.round(graded.reduce((s,c)=>s+state.quizzes[c.id].score,0)/graded.length) : 0;
  const completed = course.filter(c => state.labs[c.id] && state.quizzes[c.id]?.score >= 70).length;
  const overall = Math.round(((completed/total)*0.75 + (labDone/total)*0.25)*100);
  document.getElementById("studentDisplay").textContent = state.student || "Aluno não identificado";
  document.getElementById("studentName").value = state.student || "";
  document.getElementById("doneChapters").textContent = `${completed}/${total}`;
  document.getElementById("avgScore").textContent = `${avg}%`;
  document.getElementById("labScore").textContent = `${pct(labDone,total)}%`;
  document.getElementById("progressBar").style.width = `${overall}%`;
  let msg = "Preencha seu nome e comece pelo Capítulo 1.";
  if(state.student && completed < total) msg = `Continue, ${state.student}. Capítulos aprovados exigem lab concluído e quiz com 70%+.`;
  if(state.student && completed === total && avg >= 70) msg = "Curso concluído. Pode gerar o certificado sem o SIEM te olhar torto.";
  document.getElementById("statusMessage").textContent = msg;
}

function generateCertificate(){
  if(!state.student){ alert("Digite o nome do aluno antes. Certificado para entidade desconhecida parece log sem user."); return; }
  if(!allCourseApproved()){
    alert("Certificado bloqueado. Conclua TODOS os capítulos com lab feito e mínimo de 70% no quiz. Aqui não tem certificado por presença espiritual.");
    return;
  }
  const canvas = document.getElementById("certCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  const grad = ctx.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,"#120722");
  grad.addColorStop(.55,"#29104b");
  grad.addColorStop(1,"#7c3cff");
  ctx.fillStyle = grad; ctx.fillRect(0,0,w,h);

  ctx.fillStyle = "rgba(255,211,56,.10)";
  for(let i=0;i<18;i++){ ctx.beginPath(); ctx.arc(Math.random()*w, Math.random()*h, 80+Math.random()*120, 0, Math.PI*2); ctx.fill(); }

  ctx.strokeStyle = "#ffd338"; ctx.lineWidth = 12; ctx.strokeRect(70,70,w-140,h-140);
  ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 2; ctx.strokeRect(105,105,w-210,h-210);

  ctx.fillStyle = "#ffd338";
  ctx.font = "900 44px Arial";
  ctx.textAlign = "center";
  ctx.fillText("BE SAFE ACADEMY", w/2, 190);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 76px Arial";
  ctx.fillText("Certificado de Conclusão", w/2, 300);

  ctx.fillStyle = "#dcd3ff";
  ctx.font = "32px Arial";
  ctx.fillText("conferido a", w/2, 365);

  ctx.fillStyle = "#ffd338";
  ctx.font = "900 72px Arial";
  wrapCanvasText(ctx, state.student, w/2, 455, 1250, 78);

  ctx.fillStyle = "#ffffff";
  ctx.font = "34px Arial";
  ctx.fillText("pela conclusão do", w/2, 570);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 54px Arial";
  ctx.fillText("Short Course N2 da Be Safe Academy", w/2, 640);

  const summary = "Resumo do aprendizado: triagem avançada SOC N2, correlação SIEM, investigação de endpoint, identidade, rede, cloud, ransomware, exfiltração, comunicação técnica, handoff para resposta a incidentes e execução de labs realistas com tomada de decisão baseada em evidências.";
  ctx.fillStyle = "#eee8ff";
  ctx.font = "28px Arial";
  wrapCanvasText(ctx, summary, w/2, 725, 1220, 38);

  ctx.fillStyle = "#ffd338";
  ctx.font = "32px Arial";
  ctx.fillText(`Data: ${todayBR()}`, w/2, 905);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 32px Arial";
  ctx.fillText("Mariana BS - Cybersecurity Engineer (Instrutora)", w/2, 975);

  ctx.fillStyle = "rgba(255,255,255,.68)";
  ctx.font = "22px Arial";
  ctx.fillText("SOC N2 • Técnica com evidência • Sem fanfic de dashboard", w/2, 1020);

  const url = canvas.toDataURL("image/png");
  const a = document.getElementById("downloadCert");
  a.href = url;
  a.style.display = "inline-block";
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(" ");
  let line = "";
  for(let n=0;n<words.length;n++){
    const test = line + words[n] + " ";
    if(ctx.measureText(test).width > maxWidth && n > 0){
      ctx.fillText(line.trim(), x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, y);
}

function escapeHtml(str){
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function boot(){
  const lines = [
    "Inicializando turno SOC N2...",
    "Carregando SIEM: 42 alertas, 7 úteis, 35 pedindo terapia.",
    "Validando EDR, IAM, DNS, Proxy, CloudTrail e café.",
    "Regra do curso: evidência antes de opinião.",
    "Status: pronto para investigar sem transformar PowerShell em lenda urbana."
  ];
  const pre = document.getElementById("bootText");
  let i=0;
  const t = setInterval(() => {
    pre.textContent += lines[i] + "\n";
    i++;
    if(i>=lines.length) clearInterval(t);
  }, 420);
}

function animateBg(){
  const c = document.getElementById("bg-canvas"), ctx = c.getContext("2d");
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  resize(); addEventListener("resize", resize);
  const pts = Array.from({length:60}, () => ({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}));
  function loop(){
    ctx.clearRect(0,0,c.width,c.height);
    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.fillStyle = "rgba(255,211,56,.55)";
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>c.width) p.vx*=-1;
      if(p.y<0||p.y>c.height) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.hypot(dx,dy);
      if(d<135){ ctx.globalAlpha = 1 - d/135; ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); ctx.globalAlpha=1; }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

loadState();
renderChapters();
bind();
restoreSelections();
updateScore();
boot();
animateBg();
