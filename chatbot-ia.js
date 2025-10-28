// Chatbot IA pour Innova Toiture
class InnovaToitureChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.init();
    }

    initializeKnowledgeBase() {
        return {
            services: {
                'nettoyage': {
                    description: 'Nettoyage professionnel de toiture et façade',
                    prix: 'À partir de 15€/m²',
                    duree: '1-2 jours selon surface',
                    processus: 'Nettoyage haute pression + traitement anti-verdissures'
                },
                'fuite': {
                    description: 'Réparation urgente de fuites de toiture',
                    prix: 'Devis gratuit - intervention rapide',
                    duree: 'Intervention d\'urgence sous 24h',
                    processus: 'Diagnostic + réparation + étanchéité'
                },
                'hydrofuge': {
                    description: 'Traitement hydrofuge pour toiture et façade',
                    prix: 'À partir de 25€/m²',
                    duree: '1-3 jours selon surface',
                    processus: 'Nettoyage + application traitement + protection'
                },
                'tuiles': {
                    description: 'Rénovation complète toiture en tuiles',
                    prix: 'À partir de 45€/m²',
                    duree: '3-7 jours selon surface',
                    processus: 'Dépose + pose nouvelles tuiles + finitions'
                },
                'ardoise': {
                    description: 'Rénovation toiture en ardoise',
                    prix: 'À partir de 65€/m²',
                    duree: '5-10 jours selon surface',
                    processus: 'Remplacement ardoises + fixations + étanchéité'
                },
                'isolation': {
                    description: 'Isolation thermique combles et sous-rampants',
                    prix: 'À partir de 20€/m²',
                    duree: '1-3 jours',
                    processus: 'Diagnostic + pose isolant + finitions'
                },
                'gouttiere': {
                    description: 'Installation/rénovation gouttières alu zinc',
                    prix: 'À partir de 35€/ml',
                    duree: '1 jour',
                    processus: 'Dépose ancienne + pose nouvelle + raccordements'
                }
            },
            faq: {
                'delai': 'Nos délais d\'intervention : urgences sous 24h, projets standards 1-2 semaines',
                'devis': 'Tous nos devis sont gratuits et sans engagement. Réponse sous 48h.',
                'garantie': 'Garantie décennale sur tous nos travaux + garanties matériaux',
                'zone': 'Nous intervenons en Île-de-France et départements limitrophes',
                'urgence': 'Service d\'urgence 7j/7 pour fuites et problèmes d\'étanchéité',
                'financement': 'Possibilité de paiement échelonné et aides disponibles (MaPrimeRénov\')',
                'certifications': 'Entreprise RGE Qualibat avec assurance décennale'
            },
            contact: {
                phone: '01 23 45 67 89',
                email: 'contact@innova-toiture.fr',
                horaires: 'Lun-Ven: 8h-18h | Sam: 8h-12h',
                urgence: 'Service urgence 24h/7j'
            }
        };
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.displayWelcomeMessage();
        this.ensureButtonVisibility();
    }

    ensureButtonVisibility() {
        // S'assurer que le bouton est visible immédiatement
        const forceVisibility = () => {
            const toggle = document.getElementById('chatbot-toggle');
            if (toggle) {
                toggle.style.cssText = `
                    position: fixed !important;
                    bottom: 20px !important;
                    left: 20px !important;
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    z-index: 9999 !important;
                    width: 65px !important;
                    height: 65px !important;
                `;
            }
        };
        
        // Forcer immédiatement
        forceVisibility();
        
        // Puis après un court délai pour s'assurer
        setTimeout(forceVisibility, 50);
        setTimeout(forceVisibility, 200);
        setTimeout(forceVisibility, 500);
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="innova-chatbot" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <i class="fas fa-robot"></i>
                        <span>Assistant Innova Toiture</span>
                    </div>
                    <button class="chatbot-close" id="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <!-- Messages apparaîtront ici -->
                </div>
                <div class="chatbot-input-container">
                    <input type="text" id="chatbot-input" placeholder="Tapez votre question..." maxlength="500">
                    <button id="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="chatbot-quick-actions">
                    <button class="quick-action" data-action="devis">Demander un devis</button>
                    <button class="quick-action" data-action="urgence">Urgence</button>
                    <button class="quick-action" data-action="services">Nos services</button>
                </div>
            </div>
            
            <button id="chatbot-toggle" class="chatbot-toggle">
                <span style="font-size: 16px; font-weight: bold;">IA</span>
                <span class="chatbot-badge">💬</span>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.addChatbotStyles();
    }

    addChatbotStyles() {
        const styles = `
            <style>
                .chatbot-container {
                    position: fixed;
                    bottom: 100px;
                    left: 20px;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                    display: none;
                    flex-direction: column;
                    z-index: 10000;
                    font-family: Inter, sans-serif;
                }

                .chatbot-header {
                    background: linear-gradient(135deg, var(--primary-color, #558B2F), var(--accent-color, #4CAF50));
                    color: white;
                    padding: 15px;
                    border-radius: 15px 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 10px rgba(85, 139, 47, 0.2);
                }

                .chatbot-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                }

                .chatbot-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    transition: background 0.2s;
                }

                .chatbot-close:hover {
                    background: rgba(255,255,255,0.2);
                }

                .chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
                }

                .message {
                    max-width: 80%;
                    padding: 10px 15px;
                    border-radius: 15px;
                    word-wrap: break-word;
                }

                .message.bot {
                    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                    color: #2c3e50;
                    border: 1px solid #dee2e6;
                    align-self: flex-start;
                    border-bottom-left-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }

                .message.user {
                    background: linear-gradient(135deg, var(--primary-color, #558B2F), var(--accent-color, #4CAF50));
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 5px;
                    box-shadow: 0 2px 8px rgba(85, 139, 47, 0.3);
                }

                .message.typing {
                    background: linear-gradient(135deg, #e9ecef, #f8f9fa);
                    border: 1px solid #dee2e6;
                    align-self: flex-start;
                    padding: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }

                .typing-indicator {
                    display: flex;
                    gap: 4px;
                }

                .typing-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #999;
                    animation: typing 1.4s infinite;
                }

                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }

                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-10px); }
                }

                .chatbot-input-container {
                    display: flex;
                    padding: 15px;
                    border-top: 1px solid #eee;
                }

                #chatbot-input {
                    flex: 1;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    padding: 10px 15px;
                    outline: none;
                    font-size: 14px;
                }

                #chatbot-input:focus {
                    border-color: var(--primary-color, #558B2F);
                }

                #chatbot-send {
                    background: var(--primary-color, #558B2F);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    margin-left: 10px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                #chatbot-send:hover {
                    background: var(--accent-color, #4CAF50);
                }

                .chatbot-quick-actions {
                    display: flex;
                    gap: 5px;
                    padding: 10px 15px;
                    border-top: 1px solid #eee;
                    flex-wrap: wrap;
                }

                .quick-action {
                    background: linear-gradient(135deg, var(--secondary-color, #8BC34A), #7CB342);
                    color: white;
                    border: none;
                    padding: 8px 14px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 2px 6px rgba(139, 195, 74, 0.3);
                }

                .quick-action:hover {
                    background: linear-gradient(135deg, var(--primary-color, #558B2F), var(--accent-color, #4CAF50));
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(85, 139, 47, 0.4);
                }

                .chatbot-toggle {
                    position: fixed !important;
                    bottom: 20px;
                    left: 20px;
                    width: 65px;
                    height: 65px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary-color, #558B2F), var(--accent-color, #4CAF50));
                    color: white;
                    border: 3px solid rgba(255, 255, 255, 0.2);
                    cursor: pointer;
                    box-shadow: 0 6px 25px rgba(85, 139, 47, 0.5);
                    font-size: 16px;
                    font-weight: bold;
                    transition: all 0.3s;
                    z-index: 9999 !important;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    font-family: Inter, sans-serif;
                    animation: chatbotPulse 2s infinite;
                    opacity: 1 !important;
                    visibility: visible !important;
                }

                @keyframes chatbotPulse {
                    0% { box-shadow: 0 6px 25px rgba(85, 139, 47, 0.5), 0 0 0 0 rgba(85, 139, 47, 0.7); }
                    50% { box-shadow: 0 6px 25px rgba(85, 139, 47, 0.5), 0 0 0 10px rgba(85, 139, 47, 0); }
                    100% { box-shadow: 0 6px 25px rgba(85, 139, 47, 0.5), 0 0 0 0 rgba(85, 139, 47, 0); }
                }

                .chatbot-toggle:hover {
                    background: linear-gradient(135deg, var(--accent-color, #4CAF50), var(--secondary-color, #8BC34A));
                    transform: translateY(-3px) scale(1.1);
                    box-shadow: 0 10px 35px rgba(85, 139, 47, 0.6);
                    animation: none;
                }

                .chatbot-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ff4444;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                .service-suggestion {
                    background: var(--light-color, #E8F5E8);
                    border: 1px solid var(--secondary-color, #8BC34A);
                    border-radius: 10px;
                    padding: 10px;
                    margin: 5px 0;
                }

                .service-suggestion h4 {
                    color: var(--primary-color, #558B2F);
                    margin: 0 0 5px 0;
                    font-size: 14px;
                }

                .service-suggestion p {
                    margin: 0;
                    font-size: 12px;
                    color: #666;
                }

                /* Force le bouton à rester toujours visible */
                .chatbot-toggle {
                    position: fixed !important;
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }

                /* Style pour les liens dans les messages */
                .message a {
                    color: var(--primary-color, #558B2F);
                    text-decoration: underline;
                }

                .message.bot a {
                    color: var(--accent-color, #4CAF50);
                }

                @media (max-width: 768px) {
                    .chatbot-container {
                        width: calc(100vw - 40px);
                        height: 80vh;
                        bottom: 80px;
                        left: 20px;
                        right: 20px;
                    }
                    
                    .chatbot-toggle {
                        width: 55px;
                        height: 55px;
                        font-size: 13px;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const quickActions = document.querySelectorAll('.quick-action');

        toggle.addEventListener('click', () => this.toggleChatbot());
        close.addEventListener('click', () => this.closeChatbot());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickActions.forEach(action => {
            action.addEventListener('click', (e) => {
                this.handleQuickAction(e.target.dataset.action);
            });
        });
    }

    toggleChatbot() {
        const container = document.getElementById('innova-chatbot');
        this.isOpen = !this.isOpen;
        container.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            document.getElementById('chatbot-input').focus();
        }
    }

    closeChatbot() {
        const container = document.getElementById('innova-chatbot');
        this.isOpen = false;
        container.style.display = 'none';
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';
        
        this.showTypingIndicator();
        setTimeout(() => {
            this.processMessage(message);
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, type) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    processMessage(message) {
        this.hideTypingIndicator();
        const response = this.generateResponse(message.toLowerCase());
        this.addMessage(response, 'bot');
    }

    generateResponse(message) {
        // Détection d'intention
        if (this.containsKeywords(message, ['bonjour', 'salut', 'hello', 'coucou'])) {
            return `👋 Bonjour ! Je suis l'assistant virtuel d'Innova Toiture. Comment puis-je vous aider aujourd'hui ?<br><br>
                    <strong>Nos spécialités :</strong><br>
                    🏠 Services toiture (nettoyage, fuites, hydrofuge)<br>
                    🔧 Rénovation (tuiles, ardoises)<br>
                    🏗️ Isolation et traitement du bois<br>
                    🎨 Façades<br><br>
                    Posez-moi vos questions !`;
        }

        if (this.containsKeywords(message, ['devis', 'prix', 'tarif', 'coût', 'coute'])) {
            return this.handleDevisRequest(message);
        }

        if (this.containsKeywords(message, ['urgence', 'fuite', 'urgent', 'emergency'])) {
            return `🚨 <strong>Service d'urgence Innova Toiture</strong><br><br>
                    Pour les urgences (fuites, infiltrations) :<br>
                    📞 <strong>${this.knowledgeBase.contact.phone}</strong><br>
                    ⏰ Intervention sous 24h - 7j/7<br><br>
                    En attendant :<br>
                    • Placez un récipient sous la fuite<br>
                    • Évitez de toucher aux installations électriques<br>
                    • Prenez des photos si possible<br><br>
                    Voulez-vous que je programme un rappel d'urgence ?`;
        }

        if (this.containsKeywords(message, ['nettoyage', 'sale', 'nettoyer', 'mousse', 'vert'])) {
            const service = this.knowledgeBase.services.nettoyage;
            return `🧹 <strong>Nettoyage de toiture</strong><br><br>
                    ${service.description}<br>
                    💰 Prix : ${service.prix}<br>
                    ⏱️ Durée : ${service.duree}<br>
                    🔧 Processus : ${service.processus}<br><br>
                    Traitement anti-verdissures inclus pour une protection durable !<br><br>
                    Souhaitez-vous un devis gratuit ?`;
        }

        if (this.containsKeywords(message, ['isolation', 'isoler', 'combles', 'rampant'])) {
            const service = this.knowledgeBase.services.isolation;
            return `🏠 <strong>Isolation thermique</strong><br><br>
                    ${service.description}<br>
                    💰 Prix : ${service.prix}<br>
                    ⏱️ Durée : ${service.duree}<br>
                    🔧 Processus : ${service.processus}<br><br>
                    ✅ Matériaux écologiques<br>
                    ✅ Aides financières disponibles (MaPrimeRénov')<br>
                    ✅ Garantie décennale<br><br>
                    Voulez-vous en savoir plus sur nos solutions d'isolation ?`;
        }

        if (this.containsKeywords(message, ['tuile', 'tuiles', 'rénovation'])) {
            return this.getServiceInfo('tuiles');
        }

        if (this.containsKeywords(message, ['ardoise', 'ardoises'])) {
            return this.getServiceInfo('ardoise');
        }

        if (this.containsKeywords(message, ['hydrofuge', 'protection', 'traitement'])) {
            return this.getServiceInfo('hydrofuge');
        }

        if (this.containsKeywords(message, ['gouttière', 'gouttières', 'zinc', 'alu'])) {
            return this.getServiceInfo('gouttiere');
        }

        if (this.containsKeywords(message, ['délai', 'delai', 'quand', 'rapidement', 'temps'])) {
            return `⏰ <strong>Nos délais d'intervention</strong><br><br>
                    🚨 Urgences : Sous 24h (7j/7)<br>
                    🏠 Petits travaux : 1-2 semaines<br>
                    🏗️ Gros œuvre : 2-4 semaines<br><br>
                    Les délais dépendent de :<br>
                    • La saison (plus long en automne/hiver)<br>
                    • La complexité du projet<br>
                    • La disponibilité des matériaux<br><br>
                    Devis gratuit avec planning détaillé sous 48h !`;
        }

        if (this.containsKeywords(message, ['zone', 'secteur', 'où', 'region'])) {
            return `📍 <strong>Zone d'intervention Innova Toiture</strong><br><br>
                    Nous intervenons sur :<br>
                    🏢 Paris et petite couronne<br>
                    🌍 Île-de-France complète<br>
                    🚗 Départements limitrophes sur demande<br><br>
                    Déplacements gratuits pour tous devis !<br><br>
                    Quelle est votre localisation ?`;
        }

        if (this.containsKeywords(message, ['garantie', 'assurance', 'décennale'])) {
            return `🛡️ <strong>Nos garanties</strong><br><br>
                    ✅ Garantie décennale sur tous travaux<br>
                    ✅ Assurance responsabilité civile<br>
                    ✅ Garanties matériaux constructeur<br>
                    ✅ Certification RGE Qualibat<br><br>
                    📋 Suivi post-intervention inclus<br>
                    🔄 SAV réactif<br><br>
                    Votre tranquillité d'esprit est notre priorité !`;
        }

        if (this.containsKeywords(message, ['contact', 'téléphone', 'email', 'joindre'])) {
            return `📞 <strong>Contact Innova Toiture</strong><br><br>
                    ☎️ Téléphone : ${this.knowledgeBase.contact.phone}<br>
                    📧 Email : ${this.knowledgeBase.contact.email}<br>
                    🕒 Horaires : ${this.knowledgeBase.contact.horaires}<br>
                    🚨 Urgences : ${this.knowledgeBase.contact.urgence}<br><br>
                    Vous pouvez aussi remplir notre formulaire de contact sur le site pour un devis gratuit !`;
        }

        if (this.containsKeywords(message, ['merci', 'au revoir', 'bye', 'à bientôt'])) {
            return `😊 Merci de votre visite !<br><br>
                    N'hésitez pas à nous contacter pour tous vos projets toiture, isolation et façade.<br><br>
                    L'équipe Innova Toiture est à votre service !<br><br>
                    🏠 <em>Votre spécialiste toiture depuis plus de 20 ans</em>`;
        }

        // Réponse par défaut avec suggestions
        return `🤔 Je ne suis pas sûr de bien comprendre votre question.<br><br>
                <strong>Voici ce que je peux vous aider :</strong><br><br>
                • 💰 Demander un devis gratuit<br>
                • 🚨 Urgences et fuites<br>
                • 🏠 Informations sur nos services<br>
                • ⏰ Délais et disponibilités<br>
                • 📞 Coordonnées et contact<br><br>
                Reformulez votre question ou utilisez les boutons rapides ci-dessous !`;
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    getServiceInfo(serviceKey) {
        const service = this.knowledgeBase.services[serviceKey];
        if (!service) return "Service non trouvé.";
        
        return `🔧 <strong>${service.description}</strong><br><br>
                💰 Prix : ${service.prix}<br>
                ⏱️ Durée : ${service.duree}<br>
                🔧 Processus : ${service.processus}<br><br>
                ✅ Devis gratuit et sans engagement<br>
                ✅ Garantie décennale<br><br>
                Souhaitez-vous plus d'informations ou un devis personnalisé ?`;
    }

    handleDevisRequest(message) {
        // Tentative de détection du type de service
        let serviceType = "général";
        if (message.includes('nettoyage') || message.includes('sale')) serviceType = "nettoyage";
        else if (message.includes('fuite') || message.includes('urgent')) serviceType = "réparation urgente";
        else if (message.includes('tuile')) serviceType = "rénovation tuiles";
        else if (message.includes('ardoise')) serviceType = "rénovation ardoise";
        else if (message.includes('isolation')) serviceType = "isolation";
        
        return `💰 <strong>Devis gratuit Innova Toiture</strong><br><br>
                Parfait ! Je prépare votre demande de devis pour : <em>${serviceType}</em><br><br>
                📋 <strong>Pour un devis précis, j'aurais besoin de :</strong><br>
                • Surface approximative (m²)<br>
                • Type de bâtiment (maison, immeuble...)<br>
                • Localisation<br>
                • Photos si possible<br><br>
                🚀 <strong>2 options :</strong><br>
                1️⃣ Remplissez le formulaire sur notre site<br>
                2️⃣ Appelez directement : ${this.knowledgeBase.contact.phone}<br><br>
                ⚡ Réponse garantie sous 48h !<br><br>
                <button onclick="window.location.href='contact.html'" style="background: var(--primary-color); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">📝 Formulaire de devis</button>`;
    }

    handleQuickAction(action) {
        switch(action) {
            case 'devis':
                this.addMessage("Je souhaite obtenir un devis", 'user');
                setTimeout(() => {
                    this.processMessage("devis gratuit");
                }, 500);
                break;
            case 'urgence':
                this.addMessage("J'ai une urgence", 'user');
                setTimeout(() => {
                    this.processMessage("urgence fuite");
                }, 500);
                break;
            case 'services':
                this.addMessage("Quels sont vos services ?", 'user');
                setTimeout(() => {
                    this.processMessage("services");
                }, 500);
                break;
        }
    }

    displayWelcomeMessage() {
        setTimeout(() => {
            const welcomeMessage = `👋 <strong>Bienvenue chez Innova Toiture !</strong><br><br>
                                  Je suis votre assistant virtuel. Je peux vous aider avec :<br><br>
                                  🏠 Informations sur nos services<br>
                                  💰 Demandes de devis gratuits<br>
                                  🚨 Urgences toiture<br>
                                  📞 Contact et coordonnées<br><br>
                                  <em>Comment puis-je vous aider aujourd'hui ?</em>`;
            
            // Ajouter le message seulement si le chatbot n'a pas encore de messages
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer.children.length === 0) {
                this.addMessage(welcomeMessage, 'bot');
            }
        }, 1000);
    }
}

// Initialisation du chatbot quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation immédiate du chatbot
    window.innovaToitureChatbot = new InnovaToitureChatbot();
    console.log('🤖 Assistant IA Innova Toiture - Activé !');
});