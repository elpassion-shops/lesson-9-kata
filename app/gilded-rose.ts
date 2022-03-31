export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

//abstrakcyjna klasa to taka na której nie można wywołać new - jest tylko po to, żeby można było po niej tylko dziedziczyć

abstract class OurItem extends Item {
  abstract changeQuality(); //to oznacza, że instancja musi mieć jakieś ChangeQuality, ale nie wiadomo jakie
  protected decreaseSellIn() {
    this.sellIn -= 1;
  }
  protected handleOutOfRangeQuality() {
    if (this.quality < 0) this.quality = 0;
    if (this.quality > 50) this.quality = 50;
  }
}

class NormalItem extends OurItem {
  tick() {
    this.changeQuality();
    this.handleOutOfRangeQuality();
    this.decreaseSellIn();
  }
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 2 : 1;
  }
}

class AgedBrie extends OurItem {
  tick() {
    this.changeQuality();
    this.handleOutOfRangeQuality();
    this.decreaseSellIn();
  }
  changeQuality() {
    this.quality += this.sellIn <= 0 ? 2 : 1;
  }
}

class BackstagePasses extends OurItem {
  tick() {
    this.changeQuality();
    this.decreaseSellIn();
  }

  changeQuality() {
    let qualityChange = 0;
    let x = this.sellIn;
    if (this.sellIn > 10) {
      qualityChange = 1;
    } else if (this.sellIn > 5) {
      qualityChange = 2;
    } else if (this.sellIn > 0) {
      qualityChange = 3;
    } else {
      this.quality = 0;
    }

    this.quality += qualityChange;
    if (this.quality > 50) this.quality = 50;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private SPECIAL_ITEMS = [
    "Aged Brie",
    "Sulfuras, Hand of Ragnaros",
    "Backstage passes to a TAFKAL80ETC concert",
  ];

  updateQuality() {
    this.items.forEach((item) => {
      this.updateItemQuality(item);
    });
    return this.items;
  }

  private updateItemQuality(item: Item) {
    this.handleNormalItems(item);
    this.handleAgedBrie(item);
    this.handleBackstagePasses(item);
  }

  private handleNormalItems(item: Item) {
    if (!this.SPECIAL_ITEMS.includes(item.name)) {
      item.quality -= item.sellIn <= 0 ? 2 : 1;
      if (item.quality < 0) item.quality = 0;
      this.decreaseSellIn(item);
    }
  }

  private handleAgedBrie(item: Item) {
    if (item.name === "Aged Brie") {
      item.quality += item.sellIn <= 0 ? 2 : 1;
      if (item.quality > 50) item.quality = 50;
      this.decreaseSellIn(item);
    }
  }

  private handleBackstagePasses(item: Item) {
    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      let qualityChange = 0;
      if (item.sellIn > 10) {
        qualityChange = 1;
      } else if (item.sellIn > 5) {
        qualityChange = 2;
      } else if (item.sellIn > 0) {
        qualityChange = 3;
      } else {
        item.quality = 0;
      }

      item.quality += qualityChange;
      if (item.quality > 50) item.quality = 50;
      this.decreaseSellIn(item);
    }
  }

  private decreaseSellIn(item: Item) {
    item.sellIn -= 1;
  }
}

//najpierw napisaliśmy testy dla całej logiki biznesowej
//pogrupowaliśmy testy w oddzielne grupy dla każdego produktu
//później returnowaliśmy w początkowych częściach kodu, żeby zobaczyć co przechodzi, a conie i implementowaliśmy kod dla poszczególnych przypadków
//negujemy scenariusze - zanim usuniemy statry kod, to piszemy nowy
//później wyekstraktowaliśmy konkretne metody prywatne dla klasy Gilded Rose, żeby metoda updateItemQuality była czytelniejsza
//jeśli coś ma taki sam prefix/sufix, to pewnie można wyekstraktować obiekt
//jak tworzymy taki obiekt, to on może extends cośtam

//lepsza jest duplikacja niż zła abstrakcja!
//abstrakcja powinny być projektowana z góry do dołu, a nie od dołu do góry

//czemu małe obiekty są lepsze od małych metod?
//chodzi o podział odpowiedzialności i ekstendowanie małych metod
//np. mamy funkcję
// formatDate(format, date) {
// moment(date).format(format) //moment to taka biblioteka
// }

//i teraz np. jeśli mamy <div>{formatDate("MM-DD", "jakaśdata")}</div>
//i teraz np. jak mamy podstronę dla roku 1991, to bez sensu jest robić dla każdej daty datę z rokiem do wyświetlenia
//czyli coś może mieć sens w kontekście jednego kontekstu, a innego już nie
//może lepiej wystawić obiekt, który wystawi tylko metody, które nie dadzą tego 1991

//inny przykład, hajsu, może lepszy
