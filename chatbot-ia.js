// Assistant IA Avancé pour Innova Toiture
class InnovaToitureChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.userContext = {
            location: null,
            projectType: null,
            budget: null,
            surface: null,
            urgency: null,
            previousQuestions: []
        };
        this.knowledgeBase = this.initializeAdvancedKnowledgeBase();
        this.conversationState = 'greeting';
        this.awaitingResponse = null;
        this.init();
    }

    initializeAdvancedKnowledgeBase() {
        return {
            services: {
                'nettoyage': {
                    name: 'Nettoyage de toiture',
                    description: 'Nettoyage professionnel haute pression avec traitement anti-mousse et anti-verdissures',
                    prix: 'À partir de 12€/m²',
                    prix_details: {
                        'simple': '12-18€/m²',
                        'avec_traitement': '18-25€/m²',
                        'echafaudage': '+5-8€/m²'
                    },
                    duree: '1-2 jours selon surface',
                    processus: ['Inspection préalable', 'Protection des abords', 'Nettoyage haute pression', 'Traitement anti-verdissures', 'Rinçage et finitions'],
                    materiaux: ['Nettoyants écologiques', 'Produits anti-mousse longue durée', 'Hydrofuge si demandé'],
                    avantages: ['Prolonge la durée de vie', 'Améliore l\'étanchéité', 'Esthétique retrouvée', 'Prévention des dégradations'],
                    saison_optimale: 'Printemps et été',
                    frequence: 'Tous les 5-10 ans selon exposition'
                },
                'fuite': {
                    name: 'Réparation de fuites',
                    description: 'Intervention d\'urgence pour localiser et réparer les fuites de toiture avec garantie étanchéité',
                    prix: 'Diagnostic gratuit - Réparation dès 150€',
                    prix_details: {
                        'petite_reparation': '150-300€',
                        'moyenne_reparation': '300-800€',
                        'grosse_reparation': '800-2000€'
                    },
                    duree: 'Intervention sous 24h - Réparation 2-6h',
                    processus: ['Diagnostic d\'urgence', 'Localisation précise des fuites', 'Réparation provisoire si nécessaire', 'Réparation définitive', 'Test d\'étanchéité'],
                    urgence: true,
                    disponibilite: '7j/7 - 24h/24 pour urgences',
                    causes_communes: ['Tuiles cassées', 'Joints défaillants', 'Gouttières obstruées', 'Problèmes de charpente']
                },
                'hydrofuge': {
                    name: 'Traitement hydrofuge',
                    description: 'Protection imperméabilisante longue durée pour toitures et façades',
                    prix: 'À partir de 20€/m²',
                    prix_details: {
                        'toiture_tuiles': '20-28€/m²',
                        'toiture_ardoise': '25-35€/m²',
                        'facade': '18-25€/m²'
                    },
                    duree: '2-4 jours selon surface',
                    processus: ['Nettoyage préalable obligatoire', 'Séchage complet', 'Application hydrofuge 2 couches', 'Temps de séchage 48h'],
                    garantie: '10 ans sur efficacité',
                    conditions_meteo: 'Temps sec nécessaire',
                    avantages: ['Protection contre l\'humidité', 'Anti-gel', 'Respirant', 'Invisible']
                },
                'tuiles': {
                    name: 'Rénovation toiture tuiles',
                    description: 'Remplacement partiel ou total de couverture en tuiles terre cuite ou béton',
                    prix: 'À partir de 45€/m²',
                    prix_details: {
                        'tuiles_béton': '45-65€/m²',
                        'tuiles_terre_cuite': '55-85€/m²',
                        'tuiles_premium': '80-120€/m²'
                    },
                    duree: '3-10 jours selon surface',
                    processus: ['Dépose ancienne couverture', 'Vérification charpente', 'Pose liteaux et contre-liteaux', 'Pose tuiles neuves', 'Finitions faîtage et rives'],
                    types_tuiles: ['Tuiles plates', 'Tuiles canal', 'Tuiles mécaniques', 'Tuiles photovoltaïques'],
                    accessoires: ['Faîtières', 'Rives', 'Arêtiers', 'Chatières']
                },
                'ardoise': {
                    name: 'Rénovation toiture ardoise',
                    description: 'Pose et rénovation d\'ardoises naturelles ou synthétiques, spécialité haut de gamme',
                    prix: 'À partir de 70€/m²',
                    prix_details: {
                        'ardoise_naturelle': '70-120€/m²',
                        'ardoise_synthétique': '50-80€/m²',
                        'ardoise_fibrociment': '40-60€/m²'
                    },
                    duree: '5-15 jours selon surface',
                    processus: ['Dépose soignée', 'Tri ardoises récupérables', 'Réfection support si nécessaire', 'Pose ardoises neuves et récupérées', 'Finitions zinc'],
                    origines: ['Ardoise Angers', 'Ardoise Espagne', 'Ardoise Galles'],
                    avantages: ['Durabilité 100+ ans', 'Esthétique authentique', 'Résistance gel/dégel', 'Patrimoine préservé']
                },
                'isolation': {
                    name: 'Isolation thermique',
                    description: 'Solutions d\'isolation combles, sous-rampants et murs pour optimiser votre confort',
                    prix: 'À partir de 25€/m²',
                    prix_details: {
                        'combles_perdus': '25-40€/m²',
                        'sous_rampants': '40-65€/m²',
                        'isolation_extérieure': '120-180€/m²'
                    },
                    duree: '1-5 jours selon surface',
                    materiaux: ['Laine de verre', 'Laine de roche', 'Ouate de cellulose', 'Polyuréthane', 'Laine de bois'],
                    aides: ['MaPrimeRénov\'', 'CEE', 'Éco-PTZ', 'TVA 5.5%'],
                    economies: 'Jusqu\'à 30% sur factures chauffage',
                    processus: ['Diagnostic thermique', 'Choix isolant adapté', 'Pose pare-vapeur si nécessaire', 'Installation isolant', 'Finitions']
                },
                'gouttiere': {
                    name: 'Gouttières et évacuation',
                    description: 'Installation, réparation et entretien de systèmes d\'évacuation des eaux pluviales',
                    prix: 'À partir de 30€/ml',
                    prix_details: {
                        'pvc': '30-45€/ml',
                        'aluminium': '45-70€/ml',
                        'zinc': '60-90€/ml',
                        'cuivre': '80-120€/ml'
                    },
                    duree: '1-3 jours',
                    materiaux: ['PVC (économique)', 'Aluminium (léger)', 'Zinc (traditionnel)', 'Cuivre (prestige)'],
                    services: ['Nettoyage gouttières', 'Réparation fuites', 'Pose nouvelles gouttières', 'Installation descentes'],
                    entretien: 'Nettoyage recommandé 2x/an'
                },
                'facade': {
                    name: 'Ravalement façade',
                    description: 'Nettoyage, réparation et protection de façades tous matériaux',
                    prix: 'À partir de 35€/m²',
                    prix_details: {
                        'nettoyage_simple': '15-25€/m²',
                        'peinture_facade': '35-55€/m²',
                        'enduit_renovation': '45-75€/m²',
                        'ravalement_complet': '80-150€/m²'
                    },
                    duree: '3-10 jours selon surface',
                    types_facades: ['Crépi/Enduit', 'Pierre naturelle', 'Brique', 'Béton'],
                    traitements: ['Hydrofuge façade', 'Anti-mousse', 'Peinture microporeuse', 'Enduit de rénovation']
                },
                'traitement_bois': {
                    name: 'Traitement charpente bois',
                    description: 'Traitement préventif et curatif contre insectes xylophages et champignons',
                    prix: 'À partir de 15€/m²',
                    prix_details: {
                        'preventif': '15-25€/m²',
                        'curatif_leger': '25-40€/m²',
                        'curatif_lourd': '40-80€/m²'
                    },
                    duree: '1-3 jours',
                    nuisibles: ['Capricornes', 'Vrillettes', 'Lyctus', 'Termites', 'Mérule'],
                    traitements: ['Injection', 'Pulvérisation', 'Badigeonnage', 'Bûchage si nécessaire'],
                    garantie: '10 ans'
                }
            },
            technical_advice: {
                'saisons': {
                    'printemps': ['Nettoyage toiture', 'Vérification gouttières', 'Traitement préventif'],
                    'été': ['Gros travaux toiture', 'Hydrofuge', 'Isolation'],
                    'automne': ['Démoussage', 'Nettoyage gouttières', 'Vérifications avant hiver'],
                    'hiver': ['Urgences uniquement', 'Réparations fuites', 'Déglaçage']
                },
                'materiaux_by_region': {
                    'nord': ['Ardoise', 'Tuiles béton'],
                    'sud': ['Tuiles canal', 'Tuiles mécaniques'],
                    'montagne': ['Ardoise', 'Bac acier'],
                    'littoral': ['Matériaux anti-corrosion', 'Zinc pré-patiné']
                }
            },
            pricing_factors: {
                'surface': {
                    'petite': '< 50m² (+20% complexité)',
                    'moyenne': '50-150m² (prix standard)',
                    'grande': '> 150m² (-10% dégressif)'
                },
                'acces': {
                    'facile': 'Prix de base',
                    'difficile': '+15-30%',
                    'très_difficile': '+40-60%'
                },
                'hauteur': {
                    'rdc': 'Prix de base',
                    '1_etage': '+10%',
                    '2_etages_plus': '+20-35%'
                }
            },
            contact: {
                phone: '06 08 36 81 69',
                email: 'contact@innovatoiture.fr',
                address: '58 rue du général de gaulle, Drusenheim 67410',
                horaires: 'Lun-Ven: 8h-18h | Sam: 8h-12h',
                urgence: 'Service urgence 7j/7',
                zone: 'Bas-Rhin et alentours'
            },
            certifications: ['RGE Qualibat', 'Assurance décennale', 'Éco-artisan'],
            common_questions: {
                'Combien coûte un nettoyage de toiture ?': 'Le prix varie de 12 à 25€/m² selon l\'état et les traitements. Voulez-vous un devis personnalisé ?',
                'Quand refaire sa toiture ?': 'Généralement tous les 20-30 ans pour les tuiles, 50+ ans pour l\'ardoise. Je peux vous aider à évaluer l\'état de votre toiture.',
                'Comment savoir si j\'ai une fuite ?': 'Taches d\'humidité, moisissures, odeurs... Je peux vous guider pour un diagnostic rapide.',
                'Quelles aides pour l\'isolation ?': 'MaPrimeRénov\', CEE, TVA réduite... Je vous explique les conditions d\'éligibilité.'
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
                    <button class="quick-action" data-action="devis">💰 Devis gratuit</button>
                    <button class="quick-action" data-action="urgence">🚨 Urgence</button>
                    <button class="quick-action" data-action="services">🔧 Services</button>
                    <button class="quick-action" data-action="conseils">💡 Conseils</button>
                    <button class="quick-action" data-action="prix">📊 Prix</button>
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

                .example-question {
                    background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
                    border: 1px solid var(--secondary-color, #8BC34A);
                    border-radius: 10px;
                    padding: 10px 15px;
                    margin: 5px 0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-style: italic;
                    position: relative;
                }

                .example-question:hover {
                    background: linear-gradient(135deg, var(--light-color, #E8F5E8), #e8f5e8);
                    border-color: var(--primary-color, #558B2F);
                    transform: translateX(5px);
                    box-shadow: 0 2px 8px rgba(85, 139, 47, 0.2);
                }

                .example-question::before {
                    content: "👆";
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .example-question:hover::before {
                    opacity: 1;
                }

                .service-highlight {
                    background: linear-gradient(135deg, #fff3cd, #fef7e0);
                    border-left: 4px solid var(--accent-color, #4CAF50);
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 0 8px 8px 0;
                }

                .price-estimate {
                    background: linear-gradient(135deg, #d1ecf1, #e7f3ff);
                    border: 2px solid #4CAF50;
                    border-radius: 12px;
                    padding: 15px;
                    margin: 10px 0;
                    text-align: center;
                    font-weight: bold;
                }

                .urgent-notice {
                    background: linear-gradient(135deg, #ffe6e6, #fff0f0);
                    border: 2px solid #ff4444;
                    border-radius: 10px;
                    padding: 12px;
                    margin: 10px 0;
                    animation: urgentPulse 2s infinite;
                }

                @keyframes urgentPulse {
                    0%, 100% { border-color: #ff4444; }
                    50% { border-color: #ff6666; }
                }

                .contact-cta {
                    background: linear-gradient(135deg, var(--primary-color, #558B2F), var(--accent-color, #4CAF50));
                    color: white;
                    padding: 12px;
                    margin: 10px 0;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 4px 12px rgba(85, 139, 47, 0.3);
                }

                .contact-cta a {
                    color: white !important;
                    text-decoration: none;
                    font-weight: bold;
                }

                .technical-tip {
                    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                    border-left: 4px solid var(--secondary-color, #8BC34A);
                    padding: 12px;
                    margin: 8px 0;
                    font-style: italic;
                    position: relative;
                }

                .technical-tip::before {
                    content: "💡";
                    position: absolute;
                    left: -2px;
                    top: -2px;
                    background: white;
                    border-radius: 50%;
                    padding: 2px;
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
        // Enregistrer la question dans l'historique
        this.userContext.previousQuestions.push(message);
        
        // Analyse contextuelle intelligente
        const intent = this.analyzeIntent(message);
        const entities = this.extractEntities(message);
        
        // Mise à jour du contexte utilisateur
        this.updateUserContext(entities);
        
        // Gestion des réponses selon l'intention détectée
        switch (intent) {
            case 'greeting':
                return this.handleGreeting();
            case 'service_inquiry':
                return this.handleServiceInquiry(message, entities);
            case 'pricing':
                return this.handlePricingInquiry(message, entities);
            case 'emergency':
                return this.handleEmergency(message);
            case 'quote_request':
                return this.handleQuoteRequest(message, entities);
            case 'technical_question':
                return this.handleTechnicalQuestion(message, entities);
            case 'scheduling':
                return this.handleScheduling(message);
            case 'contact':
                return this.handleContactInquiry();
            case 'goodbye':
                return this.handleGoodbye();
            case 'project_advice':
                return this.handleProjectAdvice(message, entities);
            case 'weather_timing':
                return this.handleWeatherTiming(message);
            case 'material_choice':
                return this.handleMaterialChoice(message, entities);
            case 'maintenance':
                return this.handleMaintenance(message, entities);
            default:
                return this.handleUnknownIntent(message);
        }
    }

    analyzeIntent(message) {
        const msg = message.toLowerCase();
        
        // Salutations
        if (this.containsKeywords(msg, ['bonjour', 'salut', 'hello', 'bonsoir', 'coucou', 'hey'])) {
            return 'greeting';
        }
        
        // Urgences
        if (this.containsKeywords(msg, ['urgence', 'urgent', 'fuite', 'infiltration', 'emergency', 'vite', 'rapide', 'aujourd\'hui'])) {
            return 'emergency';
        }
        
        // Demandes de devis
        if (this.containsKeywords(msg, ['devis', 'prix', 'tarif', 'coût', 'coute', 'combien', 'budget', 'estimer', 'évaluation'])) {
            return 'pricing';
        }
        
        // Questions techniques
        if (this.containsKeywords(msg, ['comment', 'pourquoi', 'technique', 'matériau', 'matériaux', 'choisir', 'différence', 'mieux', 'recommandation'])) {
            return 'technical_question';
        }
        
        // Conseils projet
        if (this.containsKeywords(msg, ['conseil', 'aide', 'recommandation', 'que faire', 'projet', 'planifier', 'étapes'])) {
            return 'project_advice';
        }
        
        // Timing et météo
        if (this.containsKeywords(msg, ['quand', 'saison', 'météo', 'temps', 'moment', 'période', 'hiver', 'été', 'printemps', 'automne'])) {
            return 'weather_timing';
        }
        
        // Planification
        if (this.containsKeywords(msg, ['délai', 'planning', 'disponibilité', 'rdv', 'rendez-vous', 'programmer'])) {
            return 'scheduling';
        }
        
        // Contact
        if (this.containsKeywords(msg, ['contact', 'téléphone', 'email', 'adresse', 'joindre', 'appeler'])) {
            return 'contact';
        }
        
        // Services
        if (this.containsKeywords(msg, ['service', 'nettoyage', 'isolation', 'toiture', 'façade', 'hydrofuge', 'tuile', 'ardoise', 'gouttière'])) {
            return 'service_inquiry';
        }
        
        // Entretien
        if (this.containsKeywords(msg, ['entretien', 'maintenance', 'vérification', 'contrôle', 'fréquence'])) {
            return 'maintenance';
        }
        
        // Au revoir
        if (this.containsKeywords(msg, ['merci', 'au revoir', 'bye', 'à bientôt', 'goodbye'])) {
            return 'goodbye';
        }
        
        return 'unknown';
    }

    extractEntities(message) {
        const entities = {
            service: null,
            surface: null,
            material: null,
            urgency_level: null,
            location: null,
            budget_range: null,
            timeline: null
        };
        
        const msg = message.toLowerCase();
        
        // Détection service
        if (msg.includes('nettoyage') || msg.includes('nettoyer') || msg.includes('sale') || msg.includes('mousse')) entities.service = 'nettoyage';
        if (msg.includes('fuite') || msg.includes('infiltration')) entities.service = 'fuite';
        if (msg.includes('hydrofuge') || msg.includes('imperméabilisant')) entities.service = 'hydrofuge';
        if (msg.includes('tuile')) entities.service = 'tuiles';
        if (msg.includes('ardoise')) entities.service = 'ardoise';
        if (msg.includes('isolation') || msg.includes('isoler') || msg.includes('combles')) entities.service = 'isolation';
        if (msg.includes('gouttière') || msg.includes('gouttières')) entities.service = 'gouttiere';
        if (msg.includes('façade') || msg.includes('mur')) entities.service = 'facade';
        if (msg.includes('traitement') && msg.includes('bois')) entities.service = 'traitement_bois';
        
        // Détection surface (expressions régulières)
        const surfaceMatch = msg.match(/(\d+)\s*m[²2]?/);
        if (surfaceMatch) entities.surface = parseInt(surfaceMatch[1]);
        
        // Détection matériaux
        if (msg.includes('terre cuite')) entities.material = 'terre_cuite';
        if (msg.includes('béton')) entities.material = 'beton';
        if (msg.includes('zinc')) entities.material = 'zinc';
        if (msg.includes('aluminium') || msg.includes('alu')) entities.material = 'aluminium';
        if (msg.includes('pvc')) entities.material = 'pvc';
        
        // Détection urgence
        if (msg.includes('urgent') || msg.includes('vite') || msg.includes('immédiat')) entities.urgency_level = 'high';
        if (msg.includes('rapide') || msg.includes('bientôt')) entities.urgency_level = 'medium';
        
        // Détection budget
        const budgetMatch = msg.match(/(\d+)\s*[€k]/);
        if (budgetMatch) entities.budget_range = parseInt(budgetMatch[1]);
        
        return entities;
    }

    updateUserContext(entities) {
        Object.keys(entities).forEach(key => {
            if (entities[key]) {
                this.userContext[key] = entities[key];
            }
        });
    }

    handleGreeting() {
        const greetings = [
            "👋 Bonjour ! Bienvenue chez Innova Toiture ! Je suis votre assistant IA spécialisé en toiture et isolation.",
            "🏠 Salut ! Ravi de vous accueillir ! Je connais tout sur nos services : toiture, isolation, façades...",
            "👨‍🔧 Hello ! Assistant Innova Toiture à votre service ! Que puis-je faire pour vous aujourd'hui ?"
        ];
        
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        return `${greeting}<br><br>
                <strong>🎯 Mes spécialités :</strong><br>
                🔧 Diagnostic et conseils techniques<br>
                💰 Estimations tarifaires précises<br>
                📅 Planification de projets<br>
                🚨 Gestion des urgences<br>
                🏆 Aide au choix des matériaux<br><br>
                <strong>Comment puis-je vous accompagner dans votre projet ?</strong>`;
    }

    handleServiceInquiry(message, entities) {
        if (entities.service) {
            const service = this.knowledgeBase.services[entities.service];
            if (service) {
                let response = `🔧 <strong>${service.name}</strong><br><br>
                              � <strong>Description :</strong><br>${service.description}<br><br>
                              💰 <strong>Tarifs :</strong> ${service.prix}<br>
                              ⏱️ <strong>Durée :</strong> ${service.duree}<br><br>`;
                
                if (service.processus && Array.isArray(service.processus)) {
                    response += `<strong>🛠️ Notre processus :</strong><br>`;
                    service.processus.forEach((etape, index) => {
                        response += `${index + 1}. ${etape}<br>`;
                    });
                    response += `<br>`;
                }
                
                if (service.avantages) {
                    response += `<strong>✅ Avantages :</strong><br>`;
                    service.avantages.forEach(avantage => {
                        response += `• ${avantage}<br>`;
                    });
                    response += `<br>`;
                }
                
                if (entities.surface) {
                    const estimation = this.calculateEstimate(entities.service, entities.surface);
                    response += `<strong>📊 Estimation pour ${entities.surface}m² :</strong><br>${estimation}<br><br>`;
                }
                
                response += `<strong>Voulez-vous :</strong><br>
                           🎯 Un devis personnalisé ?<br>
                           📞 Être rappelé(e) ?<br>
                           🤔 Plus d'informations techniques ?`;
                
                return response;
            }
        }
        
        return `🏠 <strong>Nos services Innova Toiture :</strong><br><br>
                🧹 <strong>Nettoyage toiture</strong> - Dès 12€/m²<br>
                🚨 <strong>Réparation fuites</strong> - Intervention 24h<br>
                🛡️ <strong>Hydrofuge</strong> - Protection 10 ans<br>
                � <strong>Rénovation tuiles/ardoises</strong><br>
                🔥 <strong>Isolation</strong> - Aides disponibles<br>
                🌊 <strong>Gouttières</strong> - Tous matériaux<br>
                � <strong>Façades</strong> - Ravalement complet<br>
                🪵 <strong>Traitement bois</strong> - Anti-nuisibles<br><br>
                <strong>Lequel vous intéresse ? Soyez précis, je vous donne tous les détails !</strong>`;
    }

    handlePricingInquiry(message, entities) {
        if (entities.service && entities.surface) {
            const estimate = this.calculateDetailedEstimate(entities.service, entities.surface, entities);
            return estimate;
        }
        
        if (entities.service) {
            const service = this.knowledgeBase.services[entities.service];
            if (service && service.prix_details) {
                let response = `� <strong>Tarifs ${service.name}</strong><br><br>`;
                Object.entries(service.prix_details).forEach(([type, prix]) => {
                    response += `• ${type.replace(/_/g, ' ')} : ${prix}<br>`;
                });
                
                response += `<br><strong>⚠️ Les prix varient selon :</strong><br>
                           • Surface totale<br>
                           • Accessibilité du chantier<br>
                           • État existant<br>
                           • Matériaux choisis<br><br>
                           <strong>Pour un devis précis, quelle est la surface approximative ?</strong>`;
                
                return response;
            }
        }
        
        return `� <strong>Guide tarifaire Innova Toiture</strong><br><br>
                🧹 Nettoyage : 12-25€/m²<br>
                🛡️ Hydrofuge : 20-35€/m²<br>
                🏠 Rénovation tuiles : 45-85€/m²<br>
                🔲 Rénovation ardoise : 70-120€/m²<br>
                🔥 Isolation : 25-65€/m²<br>
                🌊 Gouttières : 30-90€/ml<br>
                🎨 Façade : 35-150€/m²<br><br>
                <strong>🎯 Pour un prix exact, dites-moi :</strong><br>
                • Quel service vous intéresse ?<br>
                • Quelle surface approximative ?<br>
                • Votre localisation ?`;
    }

    calculateDetailedEstimate(serviceKey, surface, entities) {
        const service = this.knowledgeBase.services[serviceKey];
        if (!service || !service.prix_details) return "Service non trouvé.";
        
        // Prix de base selon le type
        let basePrice = 0;
        const priceKeys = Object.keys(service.prix_details);
        
        // Sélection du prix selon le matériau ou type standard
        let selectedPriceKey = priceKeys[0]; // Par défaut
        if (entities.material && priceKeys.some(key => key.includes(entities.material))) {
            selectedPriceKey = priceKeys.find(key => key.includes(entities.material));
        }
        
        const priceRange = service.prix_details[selectedPriceKey];
        const prices = priceRange.match(/(\d+)(?:-(\d+))?€/);
        basePrice = prices ? (parseInt(prices[1]) + (parseInt(prices[2]) || parseInt(prices[1]))) / 2 : 50;
        
        // Facteurs de modification selon la surface
        let surfaceMultiplier = 1;
        if (surface < 50) surfaceMultiplier = 1.2; // Petite surface, plus cher au m²
        else if (surface > 150) surfaceMultiplier = 0.9; // Grande surface, dégressif
        
        // Facteurs selon l'urgence
        let urgencyMultiplier = 1;
        if (entities.urgency_level === 'high') urgencyMultiplier = 1.3;
        
        const estimatedPrice = Math.round(basePrice * surface * surfaceMultiplier * urgencyMultiplier);
        const minPrice = Math.round(estimatedPrice * 0.8);
        const maxPrice = Math.round(estimatedPrice * 1.2);
        
        return `📊 <strong>Estimation ${service.name}</strong><br><br>
                🏠 Surface : ${surface}m²<br>
                📋 Type : ${selectedPriceKey.replace(/_/g, ' ')}<br>
                💰 <strong>Fourchette : ${minPrice}€ - ${maxPrice}€</strong><br>
                � Prix moyen : ${estimatedPrice}€<br><br>
                <strong>⚠️ Cette estimation inclut :</strong><br>
                ${service.processus ? service.processus.map(p => `• ${p}`).join('<br>') : '• Prestation complète'}<br><br>
                <strong>🎯 Pour un devis officiel gratuit :</strong><br>
                📞 ${this.knowledgeBase.contact.phone}<br>
                📧 ${this.knowledgeBase.contact.email}<br><br>
                <em>Devis détaillé sous 48h avec visite technique si nécessaire !</em>`;
    }

    handleEmergency(message) {
        const urgencyLevel = message.includes('urgent') || message.includes('vite') ? 'high' : 'medium';
        
        return `🚨 <strong>SERVICE D'URGENCE INNOVA TOITURE</strong><br><br>
                ☎️ <strong>Appelez immédiatement : ${this.knowledgeBase.contact.phone}</strong><br>
                ⏰ <strong>Intervention sous 24h - 7j/7</strong><br><br>
                <strong>🛠️ En attendant notre arrivée :</strong><br>
                1️⃣ Sécurisez la zone (évitez l'électricité)<br>
                2️⃣ Placez des récipients sous les fuites<br>
                3️⃣ Prenez des photos des dégâts<br>
                4️⃣ Contactez votre assurance si nécessaire<br><br>
                <strong>🚨 Types d'urgences traitées :</strong><br>
                • Fuites importantes<br>
                • Tuiles/ardoises arrachées (tempête)<br>
                • Infiltrations d'eau<br>
                • Chute d'éléments de toiture<br>
                • Dégâts après intempéries<br><br>
                <strong>💡 Bon à savoir :</strong><br>
                • Intervention rapide garantie<br>
                • Devis d'urgence gratuit<br>
                • Bâchage provisoire inclus<br>
                • Facturation transparente<br><br>
                <em>L'équipe Innova Toiture est mobilisée pour vous !</em>`;
    }

    handleQuoteRequest(message, entities) {
        let response = `📋 <strong>DEMANDE DE DEVIS INNOVA TOITURE</strong><br><br>
                       Excellent ! Je prépare votre demande de devis personnalisé.<br><br>`;
        
        if (entities.service) {
            const service = this.knowledgeBase.services[entities.service];
            response += `🎯 <strong>Service identifié :</strong> ${service.name}<br>`;
        }
        
        if (entities.surface) {
            response += `📏 <strong>Surface :</strong> ${entities.surface}m²<br>`;
        }
        
        response += `<br><strong>📝 Pour un devis précis, nous avons besoin de :</strong><br>
                    ✅ Type de projet exact<br>
                    ✅ Surface et dimensions<br>
                    ✅ Localisation (déplacement gratuit)<br>
                    ✅ État actuel (photos bienvenues)<br>
                    ✅ Délais souhaités<br>
                    ✅ Budget indicatif<br><br>
                    
                    <strong>🚀 3 façons d'obtenir votre devis :</strong><br><br>
                    
                    1️⃣ <strong>APPEL TÉLÉPHONIQUE</strong><br>
                    📞 ${this.knowledgeBase.contact.phone}<br>
                    🕒 ${this.knowledgeBase.contact.horaires}<br>
                    ⚡ Devis téléphonique immédiat<br><br>
                    
                    2️⃣ <strong>FORMULAIRE EN LIGNE</strong><br>
                    📧 Via notre page contact<br>
                    📝 Détaillez votre projet<br>
                    📷 Joignez vos photos<br><br>
                    
                    3️⃣ <strong>VISITE TECHNIQUE</strong><br>
                    🏠 Déplacement gratuit<br>
                    📐 Mesures précises<br>
                    💡 Conseils personnalisés<br><br>
                    
                    <strong>⏰ Délais garantis :</strong><br>
                    • Réponse sous 48h<br>
                    • Devis détaillé gratuit<br>
                    • Validation tarif 30 jours<br><br>
                    
                    <strong>Quelle option préférez-vous ?</strong>`;
        
        return response;
    }

    handleTechnicalQuestion(message, entities) {
        const msg = message.toLowerCase();
        
        // Questions sur les matériaux
        if (msg.includes('matériau') || msg.includes('choisir') || msg.includes('mieux')) {
            return this.handleMaterialChoice(message, entities);
        }
        
        // Questions sur les techniques
        if (msg.includes('technique') || msg.includes('comment') || msg.includes('processus')) {
            return this.handleTechniqueQuestion(message, entities);
        }
        
        // Questions sur la durabilité
        if (msg.includes('durée') || msg.includes('durable') || msg.includes('longévité')) {
            return this.handleDurabilityQuestion(message, entities);
        }
        
        // Réponse générique technique
        return `🔬 <strong>EXPERTISE TECHNIQUE INNOVA TOITURE</strong><br><br>
                Je suis votre conseiller technique spécialisé ! Voici mes domaines d'expertise :<br><br>
                
                <strong>🏗️ MATÉRIAUX & TECHNIQUES :</strong><br>
                • Tuiles (terre cuite, béton, mécaniques)<br>
                • Ardoises (naturelles, synthétiques)<br>
                • Étanchéité et isolation<br>
                • Charpente et zinguerie<br><br>
                
                <strong>🧪 ANALYSES SPÉCIALISÉES :</strong><br>
                • Diagnostic d'état<br>
                • Choix matériaux selon climat<br>
                • Solutions d'isolation thermique<br>
                • Traitements préventifs et curatifs<br><br>
                
                <strong>📚 QUESTIONS FRÉQUENTES :</strong><br>
                • "Tuiles ou ardoises pour ma région ?"<br>
                • "Quel isolant choisir ?"<br>
                • "Comment éviter les infiltrations ?"<br>
                • "Traitement anti-mousse efficace ?"<br><br>
                
                <strong>Posez-moi votre question technique précise !</strong>`;
    }

    handleMaterialChoice(message, entities) {
        const msg = message.toLowerCase();
        
        if (msg.includes('tuile') || msg.includes('ardoise')) {
            return `🏠 <strong>GUIDE MATÉRIAUX TOITURE</strong><br><br>
                    
                    <strong>🧱 TUILES :</strong><br>
                    ✅ <strong>Terre cuite</strong> : Durabilité 50+ ans, esthétique, respirante<br>
                    ✅ <strong>Béton</strong> : Économique, résistante, choix couleurs<br>
                    ✅ <strong>Mécanique</strong> : Étanchéité renforcée, pose rapide<br><br>
                    
                    <strong>⬛ ARDOISES :</strong><br>
                    ✅ <strong>Naturelle</strong> : Prestige, 100+ ans, patrimoine<br>
                    ✅ <strong>Synthétique</strong> : Légère, économique, facile<br>
                    ✅ <strong>Fibrociment</strong> : Compromis prix/durabilité<br><br>
                    
                    <strong>🎯 CONSEILS SELON RÉGION :</strong><br>
                    • <strong>Nord/Est</strong> : Ardoise (résistance gel)<br>
                    • <strong>Sud</strong> : Tuiles canal (évacuation pluie)<br>
                    • <strong>Montagne</strong> : Ardoise naturelle<br>
                    • <strong>Littoral</strong> : Matériaux traités anti-corrosion<br><br>
                    
                    <strong>💰 BUDGET INDICATIF :</strong><br>
                    • Tuiles béton : 15-25€/m²<br>
                    • Tuiles terre cuite : 20-40€/m²<br>
                    • Ardoise synthétique : 30-50€/m²<br>
                    • Ardoise naturelle : 50-80€/m²<br><br>
                    
                    <strong>Quelle est votre région et votre budget ?</strong>`;
        }
        
        if (msg.includes('isolation')) {
            return `🔥 <strong>GUIDE ISOLATION THERMIQUE</strong><br><br>
                    
                    <strong>🧶 ISOLANTS TRADITIONNELS :</strong><br>
                    • <strong>Laine de verre</strong> : Économique, performante, facile<br>
                    • <strong>Laine de roche</strong> : Incombustible, acoustique++<br>
                    • <strong>Polystyrène</strong> : Léger, étanche, résistant<br><br>
                    
                    <strong>🌿 ISOLANTS ÉCOLOGIQUES :</strong><br>
                    • <strong>Laine de bois</strong> : Respirante, confort été<br>
                    • <strong>Ouate cellulose</strong> : Recyclée, déphasage thermique<br>
                    • <strong>Chanvre/Lin</strong> : Naturel, régulateur humidité<br><br>
                    
                    <strong>📊 PERFORMANCES (R) :</strong><br>
                    • Combles perdus : R ≥ 7 m².K/W<br>
                    • Rampants : R ≥ 6 m².K/W<br>
                    • Murs : R ≥ 3.7 m².K/W<br><br>
                    
                    <strong>💰 AIDES FINANCIÈRES :</strong><br>
                    • MaPrimeRénov' : jusqu'à 90€/m²<br>
                    • CEE : primes énergie<br>
                    • TVA 5.5% (travaux rénovation)<br>
                    • Éco-PTZ : financement 0%<br><br>
                    
                    <strong>Quel type d'isolation vous intéresse ?</strong>`;
        }
        
        return `🔧 <strong>CONSEILS MATÉRIAUX PERSONNALISÉS</strong><br><br>
                Pour vous donner le conseil le plus précis, j'ai besoin de connaître :<br><br>
                • 🏠 Type de bâtiment et région<br>
                • 💰 Budget approximatif<br>
                • 🎯 Objectif (rénovation, neuf, urgence)<br>
                • ⏰ Contraintes de délai<br><br>
                <strong>Décrivez-moi votre projet !</strong>`;
    }

    handleScheduling(message) {
        const currentMonth = new Date().getMonth() + 1;
        const season = this.getCurrentSeason(currentMonth);
        
        return `📅 <strong>PLANNING INNOVA TOITURE</strong><br><br>
                
                <strong>⏰ DISPONIBILITÉS ACTUELLES :</strong><br>
                • 🚨 Urgences : Intervention sous 24h<br>
                • 🏠 Petits travaux : Sous 1-2 semaines<br>
                • 🏗️ Gros projets : 2-4 semaines<br><br>
                
                <strong>🌤️ CONSEILS SAISONNIERS (${season}) :</strong><br>
                ${this.getSeasonalAdvice(season)}<br><br>
                
                <strong>📞 PRISE DE RENDEZ-VOUS :</strong><br>
                • Devis gratuit : ${this.knowledgeBase.contact.phone}<br>
                • Visite technique : Déplacement gratuit<br>
                • Urgences : 7j/7 - 24h/24<br><br>
                
                <strong>🎯 POUR PLANIFIER :</strong><br>
                1️⃣ Décrivez votre projet<br>
                2️⃣ Précisez vos contraintes de délai<br>
                3️⃣ Nous adaptons notre planning<br><br>
                
                <strong>Quand souhaiteriez-vous réaliser vos travaux ?</strong>`;
    }

    handleWeatherTiming(message) {
        const currentMonth = new Date().getMonth() + 1;
        const season = this.getCurrentSeason(currentMonth);
        
        return `🌦️ <strong>GUIDE MÉTÉO & TRAVAUX TOITURE</strong><br><br>
                
                <strong>📅 SAISONS OPTIMALES :</strong><br><br>
                
                🌸 <strong>PRINTEMPS (Mars-Mai) :</strong><br>
                ✅ Idéal : Nettoyage, diagnostic, petites réparations<br>
                ✅ Météo stable, températures douces<br>
                ⚠️ Attention aux giboulées<br><br>
                
                ☀️ <strong>ÉTÉ (Juin-Août) :</strong><br>
                ✅ Parfait : Tous gros travaux (rénovation, isolation)<br>
                ✅ Conditions optimales, séchage rapide<br>
                ⚠️ Planifier tôt (forte demande)<br><br>
                
                🍂 <strong>AUTOMNE (Sept-Nov) :</strong><br>
                ✅ Bon : Nettoyage d'automne, préparation hiver<br>
                ⚠️ Météo variable, feuilles mortes<br>
                ❌ Éviter gros travaux après octobre<br><br>
                
                ❄️ <strong>HIVER (Déc-Fév) :</strong><br>
                ✅ Urgences uniquement<br>
                ✅ Planification projets futurs<br>
                ❌ Gel, pluie, neige<br><br>
                
                <strong>🎯 ACTUELLEMENT (${season}) :</strong><br>
                ${this.getCurrentSeasonAdvice(season)}<br><br>
                
                <strong>Quel type de travaux envisagez-vous ?</strong>`;
    }

    handleMaintenance(message, entities) {
        return `🔧 <strong>GUIDE ENTRETIEN TOITURE</strong><br><br>
                
                <strong>📋 CALENDRIER D'ENTRETIEN :</strong><br><br>
                
                <strong>🌸 PRINTEMPS :</strong><br>
                • Inspection générale post-hiver<br>
                • Nettoyage gouttières<br>
                • Vérification fixations<br>
                • Traitement anti-mousse préventif<br><br>
                
                <strong>☀️ ÉTÉ :</strong><br>
                • Nettoyage haute pression<br>
                • Application hydrofuge<br>
                • Réparations identifiées au printemps<br>
                • Isolation (si travaux programmés)<br><br>
                
                <strong>🍂 AUTOMNE :</strong><br>
                • Nettoyage gouttières (feuilles)<br>
                • Démoussage final<br>
                • Vérification avant hiver<br>
                • Élagage végétation proche<br><br>
                
                <strong>❄️ HIVER :</strong><br>
                • Surveillance neige/gel<br>
                • Déglaçage gouttières si nécessaire<br>
                • Intervention urgence uniquement<br><br>
                
                <strong>🔍 SIGNES D'ALERTE :</strong><br>
                ⚠️ Tuiles/ardoises cassées ou déplacées<br>
                ⚠️ Mousse importante ou verdissures<br>
                ⚠️ Gouttières qui débordent<br>
                ⚠️ Traces d'humidité intérieur<br>
                ⚠️ Infiltrations par temps de pluie<br><br>
                
                <strong>💰 COÛTS ENTRETIEN PRÉVENTIF :</strong><br>
                • Nettoyage annuel : 12-18€/m²<br>
                • Démoussage + hydrofuge : 20-30€/m²<br>
                • Inspection complète : 150-300€<br>
                • Petites réparations : 200-500€<br><br>
                
                <strong>💡 CONSEIL :</strong> Un entretien régulier coûte 10x moins cher qu'une rénovation complète !<br><br>
                
                <strong>À quand remonte votre dernier entretien ?</strong>`;
    }

    getCurrentSeason(month) {
        if (month >= 3 && month <= 5) return 'Printemps';
        if (month >= 6 && month <= 8) return 'Été';
        if (month >= 9 && month <= 11) return 'Automne';
        return 'Hiver';
    }

    getSeasonalAdvice(season) {
        const advice = {
            'Printemps': '🌸 Période idéale pour diagnostics et nettoyages. Météo favorable.',
            'Été': '☀️ Saison optimale pour tous travaux. Planifiez rapidement !',
            'Automne': '🍂 Bon pour nettoyages préventifs avant hiver. Évitez gros travaux.',
            'Hiver': '❄️ Urgences uniquement. Profitez-en pour planifier le printemps !'
        };
        return advice[season] || advice['Printemps'];
    }

    getCurrentSeasonAdvice(season) {
        const advice = {
            'Printemps': 'Excellent moment pour débuter vos projets ! Conditions météo favorables.',
            'Été': 'Période de haute activité ! Réservez rapidement pour éviter l\'attente.',
            'Automne': 'Dernière fenêtre avant l\'hiver pour finir vos projets.',
            'Hiver': 'Saison calme idéale pour planifier vos travaux de printemps.'
        };
        return advice[season] || advice['Printemps'];
    }

    handleContactInquiry() {
        return `📞 <strong>CONTACT INNOVA TOITURE</strong><br><br>
                
                <strong>☎️ TÉLÉPHONE :</strong><br>
                ${this.knowledgeBase.contact.phone}<br>
                🕒 ${this.knowledgeBase.contact.horaires}<br>
                🚨 Urgences : 7j/7 - 24h/24<br><br>
                
                <strong>📧 EMAIL :</strong><br>
                ${this.knowledgeBase.contact.email}<br>
                ⚡ Réponse garantie sous 24h<br><br>
                
                <strong>🏠 ADRESSE :</strong><br>
                ${this.knowledgeBase.contact.address}<br>
                🗺️ ${this.knowledgeBase.contact.zone}<br><br>
                
                <strong>🚀 MOYENS DE CONTACT :</strong><br><br>
                
                1️⃣ <strong>APPEL DIRECT</strong><br>
                💬 Conseils immédiats<br>
                📋 Pré-devis téléphonique<br>
                📅 Prise de RDV rapide<br><br>
                
                2️⃣ <strong>FORMULAIRE EN LIGNE</strong><br>
                📝 Détaillez votre projet<br>
                📷 Joignez vos photos<br>
                📊 Devis personnalisé<br><br>
                
                3️⃣ <strong>WHATSAPP/SMS</strong><br>
                📱 ${this.knowledgeBase.contact.phone}<br>
                📸 Envoyez photos directement<br>
                ⚡ Diagnostic rapide<br><br>
                
                <strong>🏆 NOS ENGAGEMENTS :</strong><br>
                ✅ Devis gratuits et détaillés<br>
                ✅ Déplacements sans frais<br>
                ✅ Réponse sous 48h maximum<br>
                ✅ Transparence totale sur les prix<br><br>
                
                <strong>Comment préférez-vous être contacté(e) ?</strong>`;
    }

    handleGoodbye() {
        return `👋 <strong>Merci pour votre visite !</strong><br><br>
                J'espère avoir pu répondre à vos questions sur nos services de toiture, isolation et façades.<br><br>
                
                <strong>🎯 POUR ALLER PLUS LOIN :</strong><br>
                📞 Appelez-nous : ${this.knowledgeBase.contact.phone}<br>
                📧 Écrivez-nous : ${this.knowledgeBase.contact.email}<br>
                🌐 Visitez notre site pour plus d'infos<br><br>
                
                <strong>💡 N'oubliez pas :</strong><br>
                • Tous nos devis sont gratuits<br>
                • Nous nous déplaçons sans frais<br>
                • Service d'urgence 7j/7<br>
                • Plus de 20 ans d'expérience<br><br>
                
                <strong>🏠 L'équipe Innova Toiture reste à votre disposition !</strong><br><br>
                
                <em>À bientôt pour concrétiser votre projet ! 😊</em>`;
    }

    handleProjectAdvice(message, entities) {
        const msg = message.toLowerCase();
        
        if (msg.includes('étapes') || msg.includes('planifier') || msg.includes('organiser')) {
            return `📋 <strong>PLANIFICATION DE PROJET TOITURE</strong><br><br>
                    
                    <strong>🎯 ÉTAPES RECOMMANDÉES :</strong><br><br>
                    
                    <strong>1️⃣ DIAGNOSTIC & ÉVALUATION</strong><br>
                    • Inspection visuelle extérieure<br>
                    • Vérification combles/charpente<br>
                    • Photos des problèmes identifiés<br>
                    • Évaluation de l'urgence<br><br>
                    
                    <strong>2️⃣ CONSEILS & DEVIS</strong><br>
                    • Analyse par nos experts<br>
                    • Proposition solutions adaptées<br>
                    • Devis détaillé gratuit<br>
                    • Planning prévisionnel<br><br>
                    
                    <strong>3️⃣ PRÉPARATION</strong><br>
                    • Commande matériaux<br>
                    • Demandes administratives si nécessaire<br>
                    • Information voisinage<br>
                    • Préparation chantier<br><br>
                    
                    <strong>4️⃣ RÉALISATION</strong><br>
                    • Sécurisation du chantier<br>
                    • Travaux selon planning<br>
                    • Suivi quotidien qualité<br>
                    • Nettoyage et finitions<br><br>
                    
                    <strong>5️⃣ RÉCEPTION & SUIVI</strong><br>
                    • Visite de réception<br>
                    • Remise des garanties<br>
                    • Conseils d'entretien<br>
                    • SAV disponible<br><br>
                    
                    <strong>⏰ DURÉES INDICATIVES :</strong><br>
                    • Diagnostic : 1-2h<br>
                    • Devis : 48h<br>
                    • Préparation : 1-2 semaines<br>
                    • Travaux : Variable selon projet<br><br>
                    
                    <strong>Où en êtes-vous dans votre réflexion ?</strong>`;
        }
        
        return `💡 <strong>CONSEILS PROJET PERSONNALISÉS</strong><br><br>
                En tant qu'expert Innova Toiture, je peux vous accompagner sur :<br><br>
                
                🎯 <strong>AIDE À LA DÉCISION :</strong><br>
                • Évaluation de priorités<br>
                • Choix techniques adaptés<br>
                • Optimisation budget<br>
                • Planning optimal<br><br>
                
                📊 <strong>ANALYSE TECHNIQUE :</strong><br>
                • Diagnostic problèmes actuels<br>
                • Solutions préventives<br>
                • Matériaux recommandés<br>
                • Conformité réglementaire<br><br>
                
                💰 <strong>OPTIMISATION FINANCIÈRE :</strong><br>
                • Aides et subventions<br>
                • Échelonnement travaux<br>
                • Rapport qualité/prix<br>
                • ROI énergétique<br><br>
                
                <strong>Décrivez-moi votre situation et vos interrogations !</strong>`;
    }

    handleUnknownIntent(message) {
        // Recherche dans les questions communes
        const commonQ = this.knowledgeBase.common_questions;
        const question = Object.keys(commonQ).find(q => 
            message.toLowerCase().includes(q.toLowerCase().split(' ')[0])
        );
        
        if (question) {
            return `💡 ${commonQ[question]}`;
        }
        
        // Analyse des mots-clés pour suggestions
        const suggestions = this.generateSuggestions(message);
        
        return `🤔 <strong>Je ne suis pas sûr de bien comprendre...</strong><br><br>
                
                Peut-être cherchez-vous des informations sur :<br><br>
                ${suggestions}<br><br>
                
                <strong>💬 EXEMPLES DE QUESTIONS :</strong><br>
                • "Combien coûte un nettoyage de toiture ?"<br>
                • "J'ai une fuite urgente"<br>
                • "Quel matériau choisir pour ma région ?"<br>
                • "Quand faut-il refaire sa toiture ?"<br>
                • "Quelles aides pour l'isolation ?"<br><br>
                
                <strong>🎯 Ou utilisez les boutons rapides ci-dessous !</strong><br><br>
                
                <strong>Reformulez votre question, je suis là pour vous aider ! 😊</strong>`;
    }

    generateSuggestions(message) {
        const keywords = message.toLowerCase().split(' ');
        const suggestions = [];
        
        keywords.forEach(word => {
            Object.keys(this.knowledgeBase.services).forEach(serviceKey => {
                const service = this.knowledgeBase.services[serviceKey];
                if (service.name.toLowerCase().includes(word)) {
                    suggestions.push(`🔧 ${service.name}`);
                }
            });
        });
        
        if (suggestions.length === 0) {
            return `🏠 Nos services principaux<br>
                   💰 Tarifs et devis<br>
                   🚨 Urgences<br>
                   📞 Contact`;
        }
        
        return suggestions.slice(0, 4).join('<br>');
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    calculateEstimate(serviceKey, surface) {
        return this.calculateDetailedEstimate(serviceKey, surface, {});
    }

    handleDevisRequest(message) {
        // Tentative de détection du type de service
        let serviceType = "général";
        if (message.includes('nettoyage') || message.includes('sale')) serviceType = "nettoyage";
        else if (message.includes('fuite') || message.includes('urgent')) serviceType = "réparation urgente";
        else if (message.includes('tuile')) serviceType = "rénovation tuiles";
        else if (message.includes('ardoise')) serviceType = "rénovation ardoise";
        else if (message.includes('isolation')) serviceType = "isolation";
        
        return `<div class="contact-cta">💰 <strong>DEVIS GRATUIT INNOVA TOITURE</strong></div>
                
                Parfait ! Je prépare votre demande de devis pour : <em><strong>${serviceType}</strong></em><br><br>
                
                <div class="service-highlight">
                📋 <strong>Pour un devis ultra-précis, j'ai besoin de :</strong><br>
                • Surface exacte (m²)<br>
                • Type de bâtiment et région<br>
                • État actuel (photos bienvenues)<br>
                • Vos contraintes et délais<br>
                • Budget approximatif
                </div>
                
                🚀 <strong>3 façons d'obtenir votre devis :</strong><br><br>
                
                <div class="technical-tip">
                <strong>1️⃣ APPEL DIRECT</strong><br>
                📞 ${this.knowledgeBase.contact.phone}<br>
                ⚡ Devis téléphonique immédiat !
                </div>
                
                <div class="technical-tip">
                <strong>2️⃣ FORMULAIRE DÉTAILLÉ</strong><br>
                📝 Page contact avec photos<br>
                📊 Devis personnalisé sous 48h
                </div>
                
                <div class="technical-tip">
                <strong>3️⃣ VISITE TECHNIQUE</strong><br>
                🏠 Déplacement gratuit<br>
                📐 Mesures et conseils sur place
                </div>
                
                <div class="price-estimate">
                ⚡ RÉPONSE GARANTIE SOUS 48H !<br>
                🎯 Devis gratuit et sans engagement
                </div>
                
                <strong>Quelle option préférez-vous ? Ou donnez-moi plus de détails pour une estimation immédiate !</strong>`;
    }

    handleQuickAction(action) {
        switch(action) {
            case 'devis':
                this.addMessage("Je souhaite obtenir un devis personnalisé", 'user');
                setTimeout(() => {
                    this.processMessage("devis gratuit personnalisé");
                }, 500);
                break;
            case 'urgence':
                this.addMessage("J'ai une urgence toiture !", 'user');
                setTimeout(() => {
                    this.processMessage("urgence fuite intervention rapide");
                }, 500);
                break;
            case 'services':
                this.addMessage("Présentez-moi tous vos services", 'user');
                setTimeout(() => {
                    this.processMessage("tous les services détaillés");
                }, 500);
                break;
            case 'conseils':
                this.addMessage("J'ai besoin de conseils pour mon projet", 'user');
                setTimeout(() => {
                    this.processMessage("conseils techniques projet toiture");
                }, 500);
                break;
            case 'prix':
                this.addMessage("Donnez-moi vos tarifs détaillés", 'user');
                setTimeout(() => {
                    this.processMessage("prix tarifs tous services");
                }, 500);
                break;
        }
    }

    displayWelcomeMessage() {
        setTimeout(() => {
            const welcomeMessage = `🤖 <strong>Assistant IA Innova Toiture - Activé !</strong><br><br>
                                  👋 Salut ! Je suis votre expert virtuel en toiture et isolation, boosté à l'IA !<br><br>
                                  
                                  <strong>🧠 MES SUPER-POUVOIRS :</strong><br>
                                  🎯 <strong>Diagnostic intelligent</strong> - J'analyse votre situation<br>
                                  💰 <strong>Estimations précises</strong> - Calculs personnalisés<br>
                                  � <strong>Conseils techniques</strong> - 20+ ans d'expertise<br>
                                  ⚡ <strong>Réponses instantanées</strong> - 24h/7j disponible<br>
                                  🏆 <strong>Solutions optimales</strong> - Pour chaque projet<br><br>
                                  
                                  <strong>💡 JE COMPRENDS DES PHRASES COMME :</strong><br>
                                  • "Ma toiture a 15 ans, que faire ?"<br>
                                  • "Combien pour nettoyer 80m² ?"<br>
                                  • "J'ai une fuite urgent !"<br>
                                  • "Quel isolant pour ma région ?"<br>
                                  • "Aides financières disponibles ?"<br><br>
                                  
                                  <strong>🚀 Posez-moi VOTRE question, soyez précis, je m'occupe du reste !</strong>`;
            
            // Ajouter le message seulement si le chatbot n'a pas encore de messages
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer && messagesContainer.children.length === 0) {
                this.addMessage(welcomeMessage, 'bot');
                
                // Ajouter un second message avec des exemples interactifs
                setTimeout(() => {
                    const examplesMessage = `🎯 <strong>Exemples de questions intelligentes :</strong><br><br>
                                           <div class="example-question" onclick="document.getElementById('chatbot-input').value='J\\'ai une toiture de 120m² avec des tuiles de 20 ans, combien pour un nettoyage complet ?'; document.getElementById('chatbot-send').click();">
                                           💬 "J'ai une toiture de 120m² avec des tuiles de 20 ans, combien pour un nettoyage complet ?"</div><br>
                                           
                                           <div class="example-question" onclick="document.getElementById('chatbot-input').value='Fuite dans ma toiture, intervention d\\'urgence possible ?'; document.getElementById('chatbot-send').click();">
                                           🚨 "Fuite dans ma toiture, intervention d'urgence possible ?"</div><br>
                                           
                                           <div class="example-question" onclick="document.getElementById('chatbot-input').value='Quelle isolation choisir pour des combles de 80m² avec un budget de 3000€ ?'; document.getElementById('chatbot-send').click();">
                                           🏠 "Quelle isolation choisir pour des combles de 80m² avec un budget de 3000€ ?"</div><br>
                                           
                                           <em>Cliquez sur un exemple ou tapez votre propre question !</em>`;
                    this.addMessage(examplesMessage, 'bot');
                }, 2000);
            }
        }, 1500);
    }
}

// Initialisation du chatbot quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation immédiate du chatbot
    window.innovaToitureChatbot = new InnovaToitureChatbot();
    console.log('🤖 Assistant IA Innova Toiture - Activé !');
});
