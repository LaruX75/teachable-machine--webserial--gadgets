// 2. Kuunnellaan dataa taustalla
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    // --- TÄMÄ ON SE UUSI LOGIIKKA ---
    // Jos tämä on aivan ensimmäinen kerta kun saamme dataa:
    if (yhteys_valmis == false) {
        // Lähetetään "olen herännyt" -signaali
        serial.writeLine("1")
        // Merkitään muistiin, ettei tätä tehdä enää toiste
        yhteys_valmis = true
    }
    // -------------------------------
    // Luetaan viesti normaalisti
    raw_message = serial.readString()
    raw_message = raw_message.trim()
number = parseInt(raw_message)
    if (!(isNaN(number)) && number > 0) {
        if (number == 1) {
            naytettava_teksti = "IHMINEN"
        } else if (number == 2) {
            naytettava_teksti = "KOIRA"
        } else if (number == 3) {
            naytettava_teksti = "KISSA"
        }
    }
})
let yhteys_valmis = false
let naytettava_teksti = ""
let raw_message = ""
let number = 0
naytettava_teksti = "ODOTTAA..."
// 1. Alustetaan yhteys
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)
// 3. Pyöritetään tekstiä näytöllä
basic.forever(function () {
    basic.showString(naytettava_teksti)
})
