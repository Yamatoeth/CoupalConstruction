# 🚀 Guide d'activation GitHub Pages

## Comment activer GitHub Pages pour votre projet :

### 1. **Accéder aux paramètres du repository**
   - Allez sur https://github.com/Yamatoeth/CoupalConstruction
   - Cliquez sur l'onglet **"Settings"** (en haut à droite)

### 2. **Configurer GitHub Pages**
   - Dans le menu latéral gauche, cliquez sur **"Pages"**
   - Dans la section **"Source"**, sélectionnez **"GitHub Actions"**
   - Le workflow automatique se déclenchera lors du prochain push

### 3. **Vérifier le déploiement**
   - Allez dans l'onglet **"Actions"** de votre repository
   - Vous verrez le workflow **"Deploy to GitHub Pages"** en cours d'exécution
   - Une fois terminé (✅), votre site sera disponible

### 4. **URL de votre site web**
   Votre site sera accessible à l'adresse :
   ```
   https://yamatoeth.github.io/CoupalConstruction/
   ```

### 5. **Déploiement automatique**
   - ✅ Chaque push vers la branche `main` déclenchera un nouveau déploiement
   - ✅ Le site se mettra à jour automatiquement
   - ✅ Vous recevrez une notification en cas d'échec

## 📋 **Structure du projet (optimisée) :**

```
CoupalConstruction/
├── .github/
│   └── workflows/
│       └── pages.yml          # Configuration GitHub Actions
├── images/                    # Dossier des images (professionnel)
│   ├── 1.jpg
│   ├── 2.avif
│   ├── 3.jpg
│   ├── 4.jpg
│   ├── 5.jpg
│   └── 6.jpg
├── _config.yml               # Configuration Jekyll
├── index.html                # Page principale
├── styles.css               # Styles CSS
├── script.js               # JavaScript
├── README.md              # Documentation
└── GALLERY.md            # Guide de la galerie
```

## 🎯 **Avantages de cette configuration :**

✨ **Déploiement automatique** - Push = Mise en ligne  
📁 **Structure professionnelle** - Images organisées dans un dossier dédié  
🚀 **Performance optimisée** - Configuration Jekyll pour la vitesse  
🔒 **Sécurisé** - Permissions GitHub appropriées  
📱 **Responsive** - Fonctionne sur tous les appareils  

---

**Note :** Après activation, il faut généralement 5-10 minutes pour que le site soit accessible la première fois.
