import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Picker, useStyles } from "expo-helpers";
const values = {
  sunrise: { text: "Sunrise", color: "#FFA500" },
  ocean: { text: "Ocean", color: "#1E90FF" },
  forest: { text: "Forest", color: "#228B22" },
  sunset: { text: "Sunset", color: "#FF4500" },
  mountain: { text: "Mountain", color: "#A9A9A9" },
  simpleString: "Just a simple string value",
  sky: { text: "Sky", color: "#87CEEB" },
  desert: { text: "Desert", color: "#EDC9AF" },
  city: { text: "City at Night", color: "#2F4F4F" },
  space: { text: "Outer Space", color: "#000000" },
  river: { text: "River", color: "#00CED1" },
  valley: { text: "Valley", color: "#8B4513" },
  meadow: { text: "Meadow", color: "#ADFF2F" },
  volcano: { text: "Volcano", color: "#FF6347" },
  aurora: { text: "Aurora", color: "#9370DB" },
  rainbow: { text: "Rainbow", color: "#FF69B4" },
  island: { text: "Island", color: "#FFE4B5" },
  canyon: { text: "Canyon", color: "#D2691E" },
  glacier: { text: "Glacier", color: "#AFEEEE" },
  savannah: { text: "Savannah", color: "#F4A460" },
  tundra: { text: "Tundra", color: "#ADD8E6" },
  jungle: { text: "Jungle", color: "#006400" },
  swamp: { text: "Swamp", color: "#556B2F" },
  bay: { text: "Bay", color: "#4682B4" },
  cliff: { text: "Cliff", color: "#708090" },
  reef: { text: "Reef", color: "#40E0D0" },
  grove: { text: "Grove", color: "#8FBC8F" },
  plain: { text: "Plain", color: "#EEE8AA" },
  coast: { text: "Coast", color: "#00BFFF" },
  waterfall: { text: "Waterfall", color: "#4169E1" },
  beach: { text: "Beach", color: "#FFD700" },
  lagoon: { text: "Lagoon", color: "#00FA9A" },
  prairie: { text: "Prairie", color: "#7CFC00" },
  steppe: { text: "Steppe", color: "#DEB887" },
  cavern: { text: "Cavern", color: "#A52A2A" },
  geyser: { text: "Geyser", color: "#FFDAB9" },
  fjord: { text: "Fjord", color: "#4682B4" },
  lake: { text: "Lake", color: "#5F9EA0" },
  delta: { text: "Delta", color: "#9ACD32" },
  moor: { text: "Moor", color: "#8B008B" },
  basin: { text: "Basin", color: "#D2B48C" },
  dune: { text: "Dune", color: "#F5DEB3" },
  fen: { text: "Fen", color: "#2E8B57" },
  plateau: { text: "Plateau", color: "#8B4513" },
  range: { text: "Range", color: "#D2691E" },
  marsh: { text: "Marsh", color: "#6B8E23" },
  park: { text: "Park", color: "#98FB98" },
  hill: { text: "Hill", color: "#DAA520" },
  ridge: { text: "Ridge", color: "#CD853F" },
  gulf: { text: "Gulf", color: "#4682B4" },
  field: { text: "Field", color: "#7FFF00" },
  cove: { text: "Cove", color: "#5F9EA0" },
  pasture: { text: "Pasture", color: "#7CFC00" },
  knoll: { text: "Knoll", color: "#D2B48C" },
  wood: { text: "Wood", color: "#556B2F" },
  glen: { text: "Glen", color: "#9ACD32" },
  estuary: { text: "Estuary", color: "#4682B4" },
  badlands: { text: "Badlands", color: "#8B0000" },
  moorland: { text: "Moorland", color: "#8B008B" },
  vale: { text: "Vale", color: "#DEB887" },
  mesa: { text: "Mesa", color: "#8B4513" },
  butte: { text: "Butte", color: "#D2691E" },
  oasis: { text: "Oasis", color: "#32CD32" },
  arroyo: { text: "Arroyo", color: "#DAA520" },
  archipelago: { text: "Archipelago", color: "#00CED1" },
  atoll: { text: "Atoll", color: "#4682B4" },
  savanna: { text: "Savanna", color: "#F4A460" },
  bluff: { text: "Bluff", color: "#DAA520" },
  caldera: { text: "Caldera", color: "#FF4500" },
  chaparral: { text: "Chaparral", color: "#7F8C8D" },
  grotto: { text: "Grotto", color: "#4682B4" },
  heath: { text: "Heath", color: "#7FFF00" },
  inlet: { text: "Inlet", color: "#4682B4" },
};

export default function() {
  const { spacing } = useStyles();
  return (
    <>
      <Stack.Screen options={{ title: "Picker" }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: spacing.get("m") }}
      >
        <Picker
          title="Picker"
          placeholder="Seleziona un elemento"
          values={values}
          marginBottom="m"
        />
        <Picker
          title="Picker limit=5"
          placeholder="Seleziona più elementi"
          limit={5}
          marginBottom="m"
          values={values}
        />

        <Picker
          title="Empty picker"
          placeholder="Seleziona più elementi"
          limit={5}
          values={{}}
        />
      </ScrollView>
    </>
  );
}
