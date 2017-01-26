# Load deps and set params
library("dplyr")
library("scales")

# Create a copy of anscombe for clarity
anscombe_css <- anscombe
# Set the % range for final values
translate_scale <- c(-40,40)

# Set directory and file
anscombe_dir <- "./src/public/sass/anscombe/"
anscombe_file <- "_anscombe.scss"

# Read in existing file
sass <- readLines(paste0(anscombe_dir, anscombe_file), encoding = "UTF-8")

# Create Backup
cat(sass, file = paste0(anscombe_dir, ".anscombe ", Sys.time(), ".scss"), sep = "\n")

# Remove the auto-generated lines
sass <- sass[c(1:match("/* Generator stub */", sass))]

# Generate CSS to bind keyframes to data points
for (m in seq(nrow(anscombe))) {
  # Paste together the CSS and add to the output vector
  sass <- c(sass, paste0(
    ".dotwrapper:nth-child(", m, ") {\n",
      "\tz-index: ", m, ";\n",
      "\tanimation-name: anscombe", m, ";\n",
    "}"
  ))
}

# Rescale X's
anscombe_x <- anscombe_css %>%
  select(contains("x")) %>%
  as.matrix()
anscombe_x <- as.data.frame(rescale(anscombe_x, translate_scale))

# Rescale Y's
anscombe_y <- anscombe_css %>%
  select(contains("y")) %>%
  as.matrix()
anscombe_y <- as.data.frame(rescale(anscombe_y, translate_scale))

# Recombine the X's and Y's
anscombe_css_scaled <- cbind(anscombe_x, anscombe_y)
# Clean up unused vars
remove(anscombe_css, anscombe_x, anscombe_y)


# Generate CSS for keyframes
for (m in seq(nrow(anscombe_css_scaled))) {
  keyframe_head <- paste0("@keyframes anscombe", m, " {")
  
  sass <- c(sass, keyframe_head)
  for (n in 1:4) {
    keyframe <- paste0("\t", n * 2, "0% { transform: translate(", anscombe_css_scaled[m,n], "%, ", anscombe_css_scaled[m,(n + 4)] * -1, "%); }")
    # cat(keyframe, file = out)
    sass <- c(sass, keyframe)
  }
  sass <- c(sass, "}")
}


# Write out final contents to file
cat(sass, file = paste0(anscombe_dir, anscombe_file), sep = "\n")



# Wipe environment
rm(list = ls())
