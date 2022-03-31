import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  // it('should foo', () => {
  //   const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe('fixme');
  // });

//mamy logikę biznesową z treści zadania zapisać testami
// At the end of each day our system lowers both values for every item
//każdego itemowi sellIn powinno spaść o 1
//dodajemy item, który ma quality 1 i sprawdzamy czy następnego dnia będzie miał równe 0
  it("should decrease quality for normal item each day", ()=> {
    const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(9);
  }),
  it("should decrease sellIn for normal item each day", ()=> {
    const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);
  }),
// The Quality of an item is never negative
  it("shouldn't decrease quality below", ()=> {
    const gildedRose = new GildedRose([new Item("example item", 1, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  }),
// Once the sell by date has passed, Quality degrades twice as fast
it("should decrease quality twice for a normal item each day after sell by date has passed", ()=> {
  const gildedRose = new GildedRose([new Item("example item", -1, 10)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(8);
}),
// The Quality of an item is never more than 50
it("quality of a normal item shouldn't be greater than 50", ()=> {
  const gildedRose = new GildedRose([new Item("example item", 12, 51)]);
  expect(gildedRose.items[0].quality).not.toBe(51);
}),
it("quality of a normal item can equal 50", ()=> {
  const gildedRose = new GildedRose([new Item("example item", -1, 50)]);
  expect(gildedRose.items[0].quality).toBe(50);
}),
// “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
it("should never decrease quality for Sulfuras", ()=> {
  const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", -1, 35)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(35);
}),
// “Aged Brie” actually increases in Quality the older it gets
it("should increase quality for Aged Brie", ()=> {
  const gildedRose = new GildedRose([new Item("Aged Brie", 5, 35)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(36);
}),
it("should increase quality twice for Aged Brie after sell by date", ()=> {
  const gildedRose = new GildedRose([new Item("Aged Brie", -1, 35)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(37);
}),
it("quality of a normal item shouldn't be greater than 50", ()=> {
  const gildedRose = new GildedRose([new Item("example item", 12, 50)]);
  expect(gildedRose.items[0].quality).not.toBe(51);
}),
// “Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches;
it("should increase quality for Backstage Passes as its SellIn value approaches and it'smore than 10 days to concert", ()=> {
  const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 35)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(36);
}),
// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
it("should increase quality twice for Backstage Passes when there are less than 10 days or more than 5 days to the concert", ()=> {
  const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 35)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(37);
}),
// Quality drops to 0 after the concert
it("should increase quality three times for Backstage Passes when there are less than 5 days or more than 0 days to the concert", ()=> {
  const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 35)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(38);
}),
// “Conjured” items degrade in Quality twice as fast as normal items
it("should decrease quality for conjured items twice as fast as normal items", ()=> {
  const gildedRose = new GildedRose([new Item("Conjured item", 3, 35)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(33);
}),
// “Sulfuras” is a legendary item and as such its Quality is 80 and it never alters.
it("should increase quality for Sulfuras up to 80", ()=> {
  const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 3, 80)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(80);
}),
it("should increase quality for Sulfuras up to 80", ()=> {
  const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 3, 79)]);
  expect(gildedRose.items[0].quality).toBe(80);
})
});



