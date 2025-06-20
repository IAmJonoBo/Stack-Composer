use std::env;

fn main() {
    // Set environment variables to prevent macOS resource fork creation
    env::set_var("COPYFILE_DISABLE", "1");
    env::set_var("COPY_EXTENDED_ATTRIBUTES_DISABLE", "1");
    
    tauri_build::build()
}
