namespace Protocol {
  export interface DynamicInput {
    $input: string;
  }
  export interface DynamicOutput {
    $output: string;
  }
  export interface DynamicStore {
    $store: string;
  }

  export type DynamicField = DynamicInput | DynamicOutput | DynamicStore;

  export interface Component {
    name: string;
    input: Record<string, any | DynamicInput>;
    output?: any | DynamicOutput;
  }

  export interface Container {
    name: string;
    children: Container[] | Component[];
    config?: {
      dataSource: any[];
      $item: string;
      $index: string;
    };
  }

  export interface Main {
    title?: string;
    description?: string;
    version: string;
    content: Array<Container | Component>;
  }
}
