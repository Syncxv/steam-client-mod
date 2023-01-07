mod config;

fn main() {
    println!("hi");
    let steam_config = config::get_config();
    println!("{:?}", steam_config);
}
