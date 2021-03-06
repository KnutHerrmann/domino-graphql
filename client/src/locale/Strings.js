import LocalizedStrings from './LocalizedStrings';

const Strings = new LocalizedStrings({
  en: {
    theaterName: 'Grand Theater',
    welcome: 'Welcome to Grand Theater',
    welcomePerformanceDateTime: '{0} ... {1} at {2}',
    listOfShows: 'List of all Shows',
    shows: 'Season',
    show: 'Show',
    tickets: 'Tickets',
    visit: 'Your Visit',
    about: 'About',
    stage: 'Stage',
    seatInfo: 'All about this seat',
    row: 'Row',
    seat: 'Seat',
    sold: '(unfortunately sold)',
    price: 'Price',
    total: 'Total',
    ticket: 'Ticket',
    select: 'Please use the seating chart to select tickets.',
    buy: 'Buy tickets',
    pay: 'Pay tickets',
    customerId: 'User name (email)',
    password: 'Password',
    login: 'Login',
    loginFailed: 'Wrong login name or password',
    logout: 'Logout',
    update: 'Update data',
    createCustomer: 'New customer',
    editCustomer: 'Edit data',
    updateCustomer: 'Update data',
    changePassword: 'Change password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    repeatPassword: 'Repeat password',
    ok: 'OK',
    cancel: 'Cancel',
    firstname: 'First name',
    lastname: 'Last Name',
    phone: 'Phone',
    zipcode: 'Zip code',
    city: 'City',
    date: 'Date',
    time: 'Time',
    O: 'Orchestra',
    G: 'Grand Tier',
    LO: 'Box',
    D: 'Dress Circle',
    B: 'Balcony',
    F: 'Family Circle',
    BA: 'Block A',
    BB: 'Block B',
    BC: 'Block C',
    BD: 'Block D',
    BE: 'Block E',
    BF: 'Block F',
    BG: 'Block G',
    BH: 'Block H',
    BK: 'Block K',
    L: 'left',
    M: 'center',
    R: 'right',
  },
  de: {
    theaterName: 'Großes Theater',
    welcome: 'Willkommen im Großen Theater',
    welcomePerformanceDateTime: '{0} ... {1} um {2} Uhr',
    listOfShows: 'Akuelle Produktionen des Großen Theaters',
    shows: 'Produktionen',
    show: 'Produktion',
    tickets: 'Karten',
    visit: 'Ihr Besuch',
    about: 'Info',
    stage: 'Bühne',
    seatInfo: 'Informationen zum Sitzplatz',
    row: 'Reihe',
    seat: 'Sitz',
    sold: '(leider schon verkauft)',
    price: 'Preis',
    total: 'Gesamtpreis',
    ticket: 'Sitzplatz',
    select: 'Wählen Sie bitte die gewünschten Plätze im Sitzplan aus.',
    buy: 'Karten kaufen',
    pay: 'Karten bezahlen',
    customerId: 'Nutzername (E-Mail)',
    password: 'Kennwort',
    login: 'Login',
    loginFailed: 'Der Nutzername oder das Kennwort sind falsch',
    logout: 'Logout',
    createCustomer: 'Kundendaten anlegen',
    editCustomer: 'Kundendaten ändern',
    updateCustomer: 'Kundendaten speichern',
    changePassword: 'Kennwort ändern',
    currentPassword: 'Aktuelles Kennwort',
    newPassword: 'Neues Kennwort',
    repeatPassword: 'Kennwort wiederholen',
    ok: 'OK',
    cancel: 'Abbrechen',
    firstname: 'Vorname',
    lastname: 'Nachname',
    phone: 'Telefon',
    zipcode: 'PLZ',
    city: 'Stadt',
    date: 'Datum',
    time: 'Uhrzeit',
    O: 'Parkett',
    G: '1. Rang',
    LO: 'Loge',
    D: '2. Rang',
    B: '3. Rang',
    F: '4. Rang',
    L: 'links',
    M: 'mitte',
    R: 'rechts',
  },
});

Strings.setLanguage('en');

export default Strings;
