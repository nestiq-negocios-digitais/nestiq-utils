import meuPackage from ".."
describe("Teste exemplo do meuPackage()", () => {
  test("Deveria ser a frase 'Package funcionando!'", () => {
    expect(meuPackage()).toBe("Package funcionando!")
  })
})
