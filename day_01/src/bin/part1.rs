use regex::Regex;

fn main() {
    let input_file = include_str!("./input1.txt");
    let mut final_calibration:u64 = 0;
    for line in input_file.lines() {
        let number = read_lines(line);
        final_calibration += number.parse::<u64>().unwrap();
    }

    println!("{final_calibration}");
}

fn read_lines(input: &str) -> String {
    let re = Regex::new(r"[\d]").unwrap();
    let mut full_number = String::new();
    for caps in re.captures_iter(input) {
        for value in caps.iter() {
            full_number.push_str(value.unwrap().as_str());
        }
    }

    if full_number.len() == 1 {
        full_number.push(full_number.chars().nth(0).unwrap());
    } else if full_number.len() > 2 {
        let mut new_string = String::new();
        new_string.push(full_number.chars().nth(0).unwrap());
        new_string.push(full_number.chars().last().unwrap());
        full_number = new_string;
    }

    full_number
}

// fn read_lines(filename: &str) -> Vec<String> {
//     let mut result = Vec::new();

//     for line in read_to_string(filename).unwrap().lines() {
//         result.push(line.to_string())
//     }

//     result
// }

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        let result = part1("");
        assert_eq!(result, "4".to_string());
    }
}