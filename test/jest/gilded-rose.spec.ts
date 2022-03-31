import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('Normal items', () => {
    it('should  decrease quality', () => {
      const gildedRose = new GildedRose([new Item('example item', 1, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);

    });

    it('should not decrease quality below zero', () => {
      const gildedRose = new GildedRose([new Item('example item', 1, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);

    });

    it('should decrease twice as fast when sell in has passed', () => {
      const gildedRose = new GildedRose([new Item('example item', -1, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(8);

    });

    it('should  decrease quality if not Brie Backstage or Sulfurs', () => {
      const gildedRose = new GildedRose([new Item('example item', 1, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].name).not.toBe('Aged Brie');
      expect(gildedRose.items[0].name).not.toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(gildedRose.items[0].name).not.toBe('Sulfuras, Hand of Ragnaros');
      expect(gildedRose.items[0].quality).toBe(9);
    });

    it('should not pass max  item quality value', () => {
      const gildedRose = new GildedRose([new Item('example item', 1, 55)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
    });

  })
  describe('Special Items', () => {
    describe('Aged brie', () => {
      it('“Aged Brie” actually increases in Quality the older it gets', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(11);

      })
    });

    describe('Sulfuras', () => {
      it('“Sulfuras, Hand of Ragnaros” never has to be sold or decreases in Quality', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(10);
      })
    })
    describe('“Backstage passes to a TAFKAL80ETC concert”', () => {
      it('“Backstage passes to a TAFKAL80ETC concert” increases in Quality as it’s SellIn value approaches', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(11);
      })

      it('“Backstage passes to a TAFKAL80ETC concert” increases in Quality as it’s SellIn value approaches first mark', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(12);
      })


      it('“Backstage passes to a TAFKAL80ETC concert” increases in Quality as it’s SellIn value approaches second mark', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(13);
      })

      it('“Backstage passes to a TAFKAL80ETC concert” Quality drops to 0 after the concert', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(0);
      })
    })
    describe('Conjured Items', () => {
      it('Conjured items should decrease in quality twice as fast', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(8);
      });
    });
  });
});