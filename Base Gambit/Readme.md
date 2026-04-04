# ♟️ Base Gambit (B-GAMBIT)

**Base Gambit**, satranç ve klasik strateji oyunlarını tamamen zincir üzerine (fully on-chain) taşıyan, düşük gecikme süreli bir turnuva ve rekabet protokolüdür. Modern karmaşadan uzak, "nostaljik ve sade" bir arayüzle sadece oyunun mantığına ve topluluk rekabetine odaklanır.

---

## 🚀 Proje Vizyonu
Base ağının sunduğu yüksek işlem hızı sayesinde, her hamlenin bir akıllı sözleşme işlemi olduğu, ancak kullanıcının bunu hissetmediği akışkan bir oyun deneyimi sunmak.

* **Sıfır Hile:** Oyun mantığı tamamen akıllı sözleşmelerle (Solidity) doğrulanır.
* **Otomatik Ödüller:** Kazanan, maç biter bitmez ödül havuzundaki fonu (USDC/ETH) otomatik olarak cüzdanına alır.
* **Minimalist Estetik:** Karmaşık 3D grafikler yerine; daha sıcak, "insan elinden çıkmış" hissi veren veya retro terminal görünümlü bir tasarım dili.

---

## 🛠️ Teknik Mimari

### 1. Akıllı Sözleşme Katmanı (The Engine)
* **`GameLogic.sol`**: Hamlelerin geçerliliğini denetleyen (şah-mat kontrolü, geçersiz hamle blokajı) ana motor.
* **`TournamentVault.sol`**: Oyuncuların giriş ücretlerini (entry fee) toplar ve maç sonucuna göre ödül dağıtımını yönetir.
* **`ELO-Rating.sol`**: Oyuncuların performansına göre on-chain itibar (reputation) puanlarını güncelleyen sistem.

### 2. Kullanıcı Deneyimi (Frontend & Bot)
* **Nostaljik Arayüz**: El çizimi öğeler içeren, sade ve göz yormayan minimalist web arayüzü.
* **Turnuva Botu**: Farcaster veya Discord üzerinden çalışan, maç eşleşmelerini ve sonuçlarını anlık duyuran sosyal katman.

---

## 📦 Kurulum (Geliştiriciler İçin)

```bash
# Depoyu klonlayın
git clone [https://github.com/kullaniciadi/base-gambit.git](https://github.com/kullaniciadi/base-gambit.git)

# Bağımlılıkları yükleyin
npm install

# Kontratları derleyin
npx hardhat compile

# Base Sepolia Testnet'e dağıtın
npx hardhat run scripts/deploy.js --network base-sepolia
