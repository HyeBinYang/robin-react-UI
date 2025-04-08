import { Project } from "ts-morph";
import path from "path";
import fs from "fs";

const project = new Project({
  tsConfigFilePath: path.resolve("tsconfig.json"),
});

const source = project.createSourceFile(
  "virtual.ts",
  `
    import type { Properties } from 'csstype';
    type AllCSSKeys = keyof Properties;
  `,
  { overwrite: true }
);

const typeAlias = source.getTypeAliasOrThrow("AllCSSKeys");
const type = typeAlias.getType();
const keys = type.getUnionTypes().map((t) => t.getLiteralValue() as string);
const sorted = [...new Set(keys)].sort();
const outputPath = path.resolve("src/constant/cssProperties.ts");

fs.writeFileSync(
  outputPath,
  `
    const cssProperties = new Set(${JSON.stringify(sorted, null, 2)}); 
    export default cssProperties;
  `,
  "utf8"
);

console.log(`${sorted.length} CSS properties extract`);
