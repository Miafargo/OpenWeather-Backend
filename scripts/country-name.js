import { data } from "../country-code.js";

// script that insert a new field name, country_name,
// which is a complete name of a country
export async function insertNewField(collection) {
  const codes = Object.keys(data);

  for (let index = 0; index < codes.length; index++) {
    const country = codes[index];
    const res = await collection.updateMany(
      { country: country },
      { country_name: data[country] }
    );

    console.log(`matched: ${res.matchedCount}  modified: ${res.modifiedCount}`);
  }
}

// script that finds documents that does not have
// field name, country_name.
// cannot use async and await with forEach
// because forEach is not promise-aware
export function findDocsWithoutFieldName(collection) {
  collection.find({ country_name: { $exists: false } }, (err, docs) => {
    const names = [];
    docs.forEach((doc) => {
      const name = doc.country;
      const city = doc.name;
      names.push([name, city]);
    });
    console.log(names);
  });
}

// this script updates docs with country field
// as an empty string with new field name
// country_name and value as continent
export async function updateCountryName(collection) {
  const res = await collection.updateMany(
    { country: "" },
    { country_name: "Continent" }
  );
  console.log(`matched: ${res.matchedCount}  modified: ${res.modifiedCount}`);
}

// country-code.js data did not have XK, Kosovo
// script updates docs with country XK with
// country_name: Kosovo
export async function updateCountryKosovo(collection) {
  const res = await collection.updateMany(
    { country: "XK" },
    { country_name: "Kosovo" }
  );
  console.log(`matched: ${res.matchedCount}  modified: ${res.modifiedCount}`);
}

// script that checks if all docs
// have conutry_name field
export async function countDocWithNewField(collection) {
  const count = await collection.count({ country_name: { $exists: false } });
  console.log(count);
}
