import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  // it('should foo', () => {
  //   const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe('fixme');
  // });
  it("should decrese quality for normal item each tick", () => {
    const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);
  });
});
